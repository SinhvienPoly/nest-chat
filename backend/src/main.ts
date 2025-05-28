import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ các field không khai báo trong DTO
      forbidNonWhitelisted: true, // báo lỗi nếu có field lạ
      transform: true, // tự động chuyển đổi kiểu dữ liệu
    }),
  );

  app.use(logger);
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60, // 1 giờ
        httpOnly: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
});
