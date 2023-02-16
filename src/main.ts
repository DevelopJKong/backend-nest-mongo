import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AuthForbiddenException } from './libs/auth/auth.filter';
import { LoggerService } from './libs/logger/logger.service';
import { LoggerInterceptor } from './libs/logger/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const log = new LoggerService({ nodeEnv: process.env.NODE_ENV });
  const PORT = 5000;
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe()); // ! class-validator를 사용하기 위해 추가
  app.useGlobalInterceptors(new LoggerInterceptor(log));
  app.useGlobalFilters(new AuthForbiddenException(log));
  await app.listen(PORT);

  console.log(`Server is running on port 🍘  http://localhost:${PORT}`);
}
bootstrap();
