import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './libs/logger/logger.service';
import { LoggerInterceptor } from './libs/logger/logger.interceptor';
import { setupSwagger } from './common/utils/setup-swagger';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const log = new LoggerService({ nodeEnv: process.env.NODE_ENV });
  const PORT = 5000;
  setupSwagger(app);
  app.setGlobalPrefix('api');
  // ! class-validator를 사용하기 위해 추가
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use('/files', express.static(join(__dirname, '../files')));
  app.useGlobalInterceptors(new LoggerInterceptor(log));
  await app.listen(PORT);

  console.log(`Server is running on port 🍘  http://localhost:${PORT}`);
}
bootstrap();
