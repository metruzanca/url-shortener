import z from 'zod'
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import Redis from '../lib/redis';

const urlSchema = z.string().url();

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json()

  try {
    urlSchema.parse(body.url)
  } catch (err) {
    throw error(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
  }

  const redis = new Redis()

  const short = await redis.shortenUrl(body.url)

  console.log(`${body.url} --> ${short}`);
  
  return new Response(JSON.stringify({
    slug: short
  }));
}