import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TodoCreateDto } from './dtos/todo-create.dto';
import { User } from './schemas/user.schema';
import { TodoCategory } from './todo.enum';

@Injectable()
export class TodoService {
  constructor(@InjectModel(User.name) private readonly User: Model<User>) {}

  async userList() {
    return await this.User.find(
      {},
      {
        _id: 1,
        username: 1,
      },
    );
  }
  async createUser(username: string): Promise<User> {
    return await this.User.create({ username });
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
