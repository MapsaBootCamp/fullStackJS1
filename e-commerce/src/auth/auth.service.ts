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

  async creatUser(email: string, password: string, phoneNumber: string) {
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
    // const randomId = uuidv4();
    const randomId = 'abcd';
    const randomKey = Math.floor(Math.random() * 10 ** 6);
    await this.cacheManager.set(randomId, randomKey, 12000);
    console.log('hazrat: ', await this.cacheManager.get(randomId));
    console.log(randomKey);
    return { id: randomId };
  }
  async secondStepLogin(keyId: string, id: string) {
    console.log('keyId', keyId);
    const cachedId = await this.cacheManager.get(keyId);
    console.log('id', id);
    console.log('cachedId', cachedId);

    if (cachedId === +id) {
      return 'OK';
    } else {
      return 'NoOK';
    }
  }
}
