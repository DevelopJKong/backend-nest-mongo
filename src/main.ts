import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix('api');
  const PORT = 5000;
  app.useGlobalPipes(new ValidationPipe()); // (n
  await app.listen(PORT);

  console.log(`Server is running on port 🍘  http://localhost:${PORT}`);
}
bootstrap();
