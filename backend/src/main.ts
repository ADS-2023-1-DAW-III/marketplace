import { BaseExceptionFilter, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ValidationPipe,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

dotenv.config();

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): any {
    const detail = exception.detail;
    if (typeof detail === 'string' && detail.includes('already exists')) {
      const messageStart = exception.table.split('_').join(' ') + ' with';
      throw new BadRequestException(
        exception.detail.replace('Key', messageStart),
      );
    }
    return super.catch(exception, host);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new QueryErrorFilter());
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
