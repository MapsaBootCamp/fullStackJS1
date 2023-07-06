import { omit } from 'lodash';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { RegisterType } from './user.schema';
import Users from '../data/users';
import { Ctx } from 'src/common/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  @Inject(JwtService)
  jwtService: JwtService;

  getAllUsers() {
    return Users;
  }

  register(input: RegisterType) {
    const user = {
      id: Users.length + 1,
      ...input,
    };
    Users.push(user);
    return user;
  }

  login(username: string, password: string, ctx: Ctx) {
    const user = Users.find((user) => user.username === username);

    if (!user || user.password !== password) {
      throw new ForbiddenException('chenin useri nadarim ya pass eshtebahe');
    }

    const token = this.jwtService.sign(omit(user, ['password']));

    ctx.res.cookie('token', token);

    return omit(user, ['password']);
  }
}
