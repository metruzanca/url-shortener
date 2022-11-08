import z from 'zod'
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const urlSchema = z.string().url();

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json()

  try {
    urlSchema.parse(body.url)
  } catch (err) {
    throw error(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
  }

  let short = ''

  console.log(`${body.url} --> ${short}`);
  
  return new Response('');
}