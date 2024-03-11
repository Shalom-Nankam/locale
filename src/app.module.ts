import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StateModule } from './state/state.module';
import { RegionModule } from './region/region.module';
import { LgaModule } from './lga/lga.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionsFilter } from './exceptions/global.exceptions';
import { AppController } from './app/app.controller';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store'
import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASS,
      port: process.env.REDIS_PORT,
      isGlobal: true,
      ttl: 120,
      no_ready_check: true
    }),
    ThrottlerModule.forRoot([{
      ttl: seconds(10),
      limit: 3
    }]),
    StateModule,
    RegionModule,
    LgaModule,
    UserModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
  controllers: [AppController]
})
export class AppModule { }
