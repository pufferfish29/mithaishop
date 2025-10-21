import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { REDIS_CLIENT } from './constants';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {}

  get client() {
    return this.redisClient;
  }

  async onModuleDestroy() {
    try {
      await this.redisClient.quit();
    } catch {
      this.redisClient.disconnect();
    }
  }

  /**
   *
   * @param key key to store
   * @param value value to store
   * @param after duration for expiry in miliseconds
   */
  async set(key: string, value: string, after: number) {
    try {
      return await this.redisClient.set(key, value, 'PX', after);
    } catch (error) {
      console.error(error);
      return 'ERROR';
    }
  }

  async get(key: string) {
    return await this.redisClient.get(key);
  }
}
