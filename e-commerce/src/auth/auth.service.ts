import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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
    const dataToCache = {
      randomKey,
      email,
    };
    console.log('OTP KEY: ', randomKey);
    console.log('cache data: ', JSON.stringify(dataToCache));
    await this.cacheManager.set(randomId, JSON.stringify(dataToCache), 120000);
    return { id: randomId };
  }
  async secondStepLogin(keyId: string, id: string) {
    const data = await this.cacheManager.get(keyId);
    console.log('extracted data: ', data);

    if (data) {
      const { randomKey, email } = JSON.parse(data);
      if (randomKey === +id) {
        await this.cacheManager.del(keyId);
        return this.jwtService.sign({ email });
      } else {
        return 'NoOK';
      }
    } else {
      return 'NoOK';
    }
  }
}
