import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
  imports: [AuthModule, EncryptionModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
