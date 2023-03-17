import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RemovePasswordInterceptor } from './interceptors/remove-password.interceptor';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);

  prismaService.enableShutdownHooks(app);

  const validationPipe = new ValidationPipe({
    forbidNonWhitelisted: true,
    transform: true,
    whitelist: true,
  });

  app.useGlobalPipes(validationPipe);

  await app.listen(3000);
}

bootstrap();
