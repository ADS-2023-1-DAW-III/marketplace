import { BaseExceptionFilter, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ArgumentsHost,
  Catch,
  ConflictException,
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
      throw new ConflictException(
        exception.detail.replace('Key', messageStart),
      );
    }
    return super.catch(exception, host);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Marketplace')
    .setDescription('sistema de Marketplace de Serviços')
    .setVersion('1.0')
    .addTag('auth', 'API referente a login e signup do usuário')
    .addTag('categoria', 'API referente a CRUD de categoria')
    .addTag('negociacao', 'API referente a CRUD de negociação')
    .addTag('pagamento', 'API referente a CRUD de pagamento')
    .addTag('servico', 'API referente a CRUD de serviço')
    .addTag('historico', 'API referente a CRUD de serviço')
    .addTag('pessoa', 'API referente a CRUD de pessoa')
    .addGlobalResponse({
      status: 401,
      description: 'Não Autorizado: Token de acesso ausente ou inválido.',
    })
    .addGlobalResponse({
      status: 400,
      description: 'Requisição Inválida: Dados enviados são inválidos.',
    })
    .addGlobalResponse({
      status: 500,
      description:
        'Erro Interno do Servidor: Ocorreu um erro inesperado no servidor.',
    })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
