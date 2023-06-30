import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.createUser(username, hashedPassword);
  }

  async loginService(username: string, password: string): Promise<string> {
    const user = await this.userService.findUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException('username ya pass ghalate');
    }
    const validatePass = await bcrypt.compare(password, user.password);
    if (!validatePass) {
      throw new UnauthorizedException('username ya pass ghalate');
    }
    return this.jwtService.sign({ username });
  }
}
