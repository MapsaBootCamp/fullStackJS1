import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TodoCategory } from '../todo.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
class Todo {
  @Prop({ required: true })
  title: string;

  @Prop(TodoCategory)
  type: TodoCategory;

  @Prop({ required: false })
  dueDate: Date;

  @Prop({ default: false })
  done: boolean;
}

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop([Todo])
  todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
