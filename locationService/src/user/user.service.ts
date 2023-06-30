import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findUserByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  async addUserToRoom(username: string, roomId: any) {
    console.log(roomId);

    return await this.userModel.updateOne(
      { username },
      {
        $push: { rooms: roomId },
      },
    );
  }

  async createUser(
    username: string,
    hashedPassword: string,
  ): Promise<User | Error> {
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
