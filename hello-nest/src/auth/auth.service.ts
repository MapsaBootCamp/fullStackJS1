import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TodoService } from 'src/todos/todo.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly todoService: TodoService,
  ) {}

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new HttpException('invalid token!', 403);
    }
  }
  async getUserById(id: string) {
    return await this.todoService.getUserById(id);
  }
}
