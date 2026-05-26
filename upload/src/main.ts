import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Isso diz ao NestJS: "Tudo que estiver na pasta 'uploads' pode ser acessado via URL"
  app.useStaticAssets(join(__dirname, '..', 'drive'), {
    prefix: '/drive',
  });
  app.enableCors(); // Fundamental para o Angular conseguir ler os dados
  await app.listen(3000);
}
bootstrap();