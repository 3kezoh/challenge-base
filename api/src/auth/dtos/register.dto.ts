import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password!: string;
}
