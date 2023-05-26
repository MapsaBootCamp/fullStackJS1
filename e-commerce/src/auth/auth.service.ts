import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async createUser(email: string, password: string, phoneNumber: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.createUser(
      email,
      hashedPassword,
      phoneNumber,
    );
  }

  async firstStepLogin(
    email: string,
    password: string,
  ): Promise<{ id: string }> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('email ya pass ghalate');
    }
    const validatePass = await bcrypt.compare(password, user.password);
    if (!validatePass) {
      throw new UnauthorizedException('email ya pass ghalate');
    }
    const randomId = uuidv4();
    // const randomKey = Math.floor(Math.random() * 10 ** 6);
    const randomKey = Math.floor(100000 + Math.random() * 900000);
    console.log('OTP KEY: ', randomKey);
    await this.cacheManager.set(randomId, randomKey, 120000);
    return { id: randomId };
  }
  async secondStepLogin(keyId: string, id: string) {
    const cachedId = await this.cacheManager.get(keyId);

    if (cachedId === +id) {
      return 'OK';
    } else {
      return 'NoOK';
    }
  }
}
