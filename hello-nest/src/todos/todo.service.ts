import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LoggerService } from 'src/logger/logger.service';
import { TodoCreateDto } from './dtos/todo-create.dto';
import { User, UserDocument } from './schemas/user.schema';
import { TodoCategory } from './todo.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(User.name) private readonly User: Model<User>,
    @Inject('LOGGER') private readonly logger: LoggerService,
  ) {}

  getName(): string {
    return 'DATA';
  }

  async getUserById(id: string): Promise<UserDocument> {
    return await this.User.findById(id);
  }

  async getUser(username: string): Promise<UserDocument> {
    return await this.User.findOne({ username });
  }

  async userList(): Promise<User[]> {
    return await this.User.find(
      {},
      {
        _id: 1,
        username: 1,
      },
    ).lean();
  }
  async createUser(username: string, password: string): Promise<User> {
    const hashedPass = await bcrypt.hash(password, 10);
    const userDocument = await this.User.create({
      username,
      password: hashedPass,
    });
    return userDocument.toJSON();
  }

  async addTodo(userId: string, todoCreateDto: TodoCreateDto): Promise<User> {
    return await this.User.findByIdAndUpdate(
      userId,
      {
        $push: { todos: todoCreateDto },
      },
      { new: true },
    );
  }

  async getUserTodos(userId: string, typeTodo: TodoCategory) {
    this.logger.logger(`user ${userId} requested.`, 'INFO');

    const data = await this.User.aggregate([
      { $match: { _id: new Types.ObjectId(userId) } },
      { $unwind: '$todos' },
      { $match: { 'todos.type': typeTodo } },
      // {
      //   $group: {
      //     _id: '$_id',
      //     todos: { $push: { type: '$todos.type', title: '$todos.title' } },
      //   },
      // },
    ]);
    console.log(data);
    return data;
  }
}
