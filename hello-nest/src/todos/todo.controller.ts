import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseEnumPipe,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TestGuards } from 'src/common/guards/TestGuard.guards';
import {
  LoggerInterceptor,
  TransformInterceptor,
} from 'src/common/interceptors';
import { UserResponseDto } from './dtos/response.dto';
import { TodoCreateDto } from './dtos/todo-create.dto';
import { CreateUserDto } from './dtos/user-create.dto';
import { Role, User } from './schemas/user.schema';
import { TodoCategory } from './todo.enum';
import { TodoService } from './todo.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.gaurds';
import { Roles } from 'src/auth/role.decorator';

// @UseInterceptors(LoggerInterceptor)
@Controller()
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    @Inject('MOCKDATA') private readonly mockData,
    private readonly jwtService: JwtService,
  ) {}

  @HttpCode(201)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async createUser(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.todoService.createUser(
      body.username,
      body.password,
    );
    return new UserResponseDto(user);
  }

  @Post('login')
  async login(@Body() body: CreateUserDto): Promise<{ access_token: string }> {
    const user = await this.todoService.getUser(body.username);
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('username or password is incorrect!');
    }
    const comparePass = await bcrypt.compare(body.password, user.password);
    if (!comparePass) {
      throw new UnauthorizedException('username or password is incorrect!');
    }
    return { access_token: this.jwtService.sign({ id: user._id }) };
  }

  @UseInterceptors(
    ClassSerializerInterceptor,
    LoggerInterceptor,
    TransformInterceptor,
  )
  @UseGuards(AuthGuard)
  // @Roles(Role.ADMIN)
  @Get('users')
  async getUserList(): Promise<UserResponseDto[]> {
    const users = await this.todoService.userList();
    return users.map((user) => new UserResponseDto(user));
  }

  @UseGuards(AuthGuard)
  @Get('todos/:typeTodo/:userId')
  async getUserTodo(
    @Req() request,
    @Param('userId') userId: string,
    @Param('typeTodo', new ParseEnumPipe(TodoCategory)) typeTodo: TodoCategory,
  ) {
    console.log('USER', request.user);

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
