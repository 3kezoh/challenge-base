import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../encryption/encryption.service';
import jwtConfig from './configs/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow('jwt'),
    }),
  ],
  providers: [
    AuthService,
    ConfigService,
    EncryptionService,
    JwtStrategy,
    PrismaService,
    UsersService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}