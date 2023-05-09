import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseEnumPipe,
  Post,
} from '@nestjs/common';
import { UserResponseDto } from './dtos/response.dto';
import { TodoCreateDto } from './dtos/todo-create.dto';
import { CreateUserDto } from './dtos/user-create.dto';
import { User } from './schemas/user.schema';
import { TodoCategory } from './todo.enum';
import { TodoService } from './todo.service';

@Controller()
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    @Inject('MOCKDATA') private readonly mockData,
  ) {}

  @HttpCode(201)
  @Post('register')
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.todoService.createUser(body.username);
  }

  @Get('users')
  async getUserList(): Promise<UserResponseDto[]> {
    const users = await this.todoService.userList();

    return users.map((user) => new UserResponseDto(user));
  }

  @Get('todos/:typeTodo/:userId')
  async getUserTodo(
    @Param('userId') userId: string,
    @Param('typeTodo', new ParseEnumPipe(TodoCategory)) typeTodo: TodoCategory,
  ) {
    console.log(this.mockData);
    return await this.todoService.getUserTodos(userId, typeTodo);
  }

  @Post('todos/:userId')
  async addUserTask(
    @Param('userId') userId: string,
    @Body() todoCreateDto: TodoCreateDto,
  ) {
    return await this.todoService.addTodo(userId, todoCreateDto);
  }
}
