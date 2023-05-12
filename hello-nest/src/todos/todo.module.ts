import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from './schemas/user.schema';
import { TodoController } from './todo.controller';
import { TestMiddleware } from './todo.middleware';
import { TodoService } from './todo.service';

const mockTodoData = {
  data: [1, 3, 5],
};

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [TodoController],
  providers: [
    { provide: TodoService, useClass: TodoService },
    {
      provide: 'MOCKDATA',
      useFactory: (arg1) => {
        const name = arg1.getName();
        console.log('useFactory', name);
        return mockTodoData;
      },
      inject: [TodoService],
    },
  ],
  exports: [TodoService],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TestMiddleware, TestMiddleware)
      .exclude('(.*)/work/(.*)')
      .forRoutes('*');
  }
}
