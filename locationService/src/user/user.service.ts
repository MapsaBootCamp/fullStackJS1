import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findUserByUsername(username: string): Promise<UserDocument> {
    return await this.userModel.findOne({ username });
  }

  async addUserToRoom(username: string, roomId: Types.ObjectId | string) {
    return await this.userModel.updateOne(
      { username },
      { $addToSet: { rooms: roomId } },
      { new: true },
    );
  }

  async createUser(
    username: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    if (await this.userModel.exists({ username })) {
      throw new HttpException('chenin useri darim', HttpStatus.CONFLICT);
    }
    try {
      return await this.userModel.create({
        username,
        password: hashedPassword,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
