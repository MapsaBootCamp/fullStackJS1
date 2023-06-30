import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserLoginDto } from './dtos/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signUp(@Body() userCreateDto: UserCreateDto): Promise<any> {
    const { username, password } = userCreateDto;
    return await this.authService.createUser(username, password);
  }

  @Post('login')
  async signIn(@Body() userLoginDto: UserLoginDto): Promise<any> {
    const { username, password } = userLoginDto;
    return await this.authService.loginService(username, password);
  }
}
