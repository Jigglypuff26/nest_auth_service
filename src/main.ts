import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальная валидация
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Глобальная сериализация
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Включаем CORS
  app.enableCors();

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Auth Service API')
    .setDescription('Документация для сервиса аутентификации')
    .setVersion('1.0')
    .addBearerAuth() // JWT авторизация
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
