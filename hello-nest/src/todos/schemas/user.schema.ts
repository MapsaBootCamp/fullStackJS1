import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { TodoCategory } from '../todo.enum';

export type UserDocument = HydratedDocument<User>;

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

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

  @Prop({ minlength: [6, 'password too short!'] })
  password: string;

  @Prop([Todo])
  todos: Todo[];

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
