import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  password: string;

  @Matches(/^09[0-9]{9}$/)
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}
