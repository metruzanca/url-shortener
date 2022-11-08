import { createClient, type RedisClientType } from 'redis';
import createBase64 from './base64';

// Not handling open-close connection here very well

export default class Redis {
  private client: RedisClientType
  constructor() {   
    this.client = createClient({ url: import.meta.env.VITE_REDIS_URL })
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    this.client.connect()
  }
  private async createUniqueKey() {
    // Its 3:30am, theres probably a simply way I can't see to do this
    let alreadyExists;
    let key;
    do {
      key = createBase64()
      const url = await this.client.get(key)
      alreadyExists = url !== null
    } while (alreadyExists)
    return key;
  }

  async getUrl(key: string) {
    const res = await this.client.get(key)
    this.client.disconnect() // don't wait to close connection, get the user their link back ASAP
    return res;
  }

  async shortenUrl(url: string) {
    const key = await this.createUniqueKey()
    const res = await this.client.set(key, url)
    this.client.disconnect() // don't wait to close connection, get the user their link back ASAP
    return res;
  }

}
