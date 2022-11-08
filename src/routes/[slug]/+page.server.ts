import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import Redis from '$lib/redis';

export const load: PageServerLoad = ({ params }) => {
  if (params.slug) {
    const client = new Redis()
    const url = client.getUrl(params.slug);
    return { url };
  }

  throw error(404, 'Not found');
}
