import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserLoginStep2Dto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  @MinLength(6)
  id: string;
}
