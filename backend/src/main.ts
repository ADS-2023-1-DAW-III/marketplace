import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Marketplace')
    .setDescription('sistema de Marketplace de Serviços')
    .setVersion('1.0')
    .addTag('Marketplace')
    .addTag('pagamento', 'API referente a CRUD de pagamento')
    .addTag('serviço', 'API referente a CRUD de serviço')
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
