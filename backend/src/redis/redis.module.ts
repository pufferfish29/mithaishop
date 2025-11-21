import { Global, Module } from "@nestjs/common";
import Redis from "ioredis";
import { REDIS_CLIENT } from "./constants";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisService } from "./redis.service";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return new Redis({
          host: configService.getOrThrow<string>("REDIS_HOST"),
          port: parseInt(configService.getOrThrow<string>("REDIS_PORT"), 10),
          password: process.env.REDIS_PASSWORD,
        });
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
