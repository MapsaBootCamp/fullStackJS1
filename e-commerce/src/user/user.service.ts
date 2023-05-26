import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }
  async createUser(
    email: string,
    hashedPassword: string,
    phoneNumber: string,
  ): Promise<User | Error> {
    if (await this.userModel.exists({ email })) {
      throw new HttpException('chenin useri darim', HttpStatus.CONFLICT);
    }
    try {
      return await this.userModel.create({
        email,
        password: hashedPassword,
        phoneNumber,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
