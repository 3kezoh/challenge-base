import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './interfaces/payload.interface';
import { Prisma, User } from '@prisma/client';
import { RegisterDto } from './dtos/register.dto';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private encryptionService: EncryptionService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register({ email, password }: RegisterDto) {
    try {
      const hashedPassword = await this.encryptionService.hashPassword(
        password,
      );

      const user = await this.userService.create({
        email,
        password: hashedPassword,
      });

      return user;
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('This email is already registered');
        }
      }

      throw error;
    }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await this.encryptionService.validatePassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return user;
  }

  getToken(userId: User['id']) {
    const payload: Payload = {
      sub: userId,
    };

    return this.jwtService.sign(payload);
  }
}
