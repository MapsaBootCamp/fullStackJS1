import {
  IsOptional,
  IsString,
  IsDate,
  IsBoolean,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { TodoCategory } from '../todo.enum';

export class TodoCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsEnum(TodoCategory)
  type: TodoCategory;

  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
