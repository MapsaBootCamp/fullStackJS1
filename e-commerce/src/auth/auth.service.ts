import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async creatUser(email: string, password: string, phoneNumber: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.createUser(
      email,
      hashedPassword,
      phoneNumber,
    );
  }
}
