import { Body, Controller, Post, Redirect, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signUp(@Body() userCreateDto: UserCreateDto): Promise<any> {
    const { email, password, phoneNumber } = userCreateDto;
    return await this.authService.creatUser(email, password, phoneNumber);
  }

  @Post('login')
  async signIn(@Body() userLoginDto: UserLoginDto): Promise<any> {
    const { email, password } = userLoginDto;
    return await this.authService.firstStepLogin(email, password);
  }
}
