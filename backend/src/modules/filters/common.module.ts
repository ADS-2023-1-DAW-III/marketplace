import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { BadRequestFilter } from './bad.request.exception.filter';
import { NotFoundFilter } from './not.found.exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: BadRequestFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter,
    },
  ],
})
export class commonModule {}
