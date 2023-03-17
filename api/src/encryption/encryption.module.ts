import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import bcryptConfig from './config/bcrypt.config';
import { EncryptionService } from './encryption.service';

@Module({
  imports: [ConfigModule.forFeature(bcryptConfig)],
  providers: [EncryptionService],
})
export class EncryptionModule {}
