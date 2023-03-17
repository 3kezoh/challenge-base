import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { RemovePasswordInterceptor } from '../interceptors/remove-password.interceptor';
import { RequestUser } from '../decorators/request-user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { JwtAuthGuard } from './jwt.guard';

@UseInterceptors(RemovePasswordInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@RequestUser() user: User) {
    return user;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    const token = this.authService.getToken(user.id);

    return {
      user,
      token,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    const token = this.authService.getToken(user.id);

    return {
      user,
      token,
    };
  }
}
