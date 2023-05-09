import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { TodoController } from './todo.controller';
import { TestMiddleware } from './todo.middleware';
import { TodoService } from './todo.service';

const mockTodoData = {
  data: [1, 3, 5],
};

@Module({
  imports: [
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
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TestMiddleware, TestMiddleware)
      .exclude('(.*)/work/(.*)')
      .forRoutes('*');
  }
}
