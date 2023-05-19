import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
