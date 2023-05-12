import { forwardRef, Module } from '@nestjs/common';
import { TodoModule } from 'src/todos/todo.module';
import { AuthService } from './auth.service';

@Module({
  imports: [forwardRef(() => TodoModule)],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
