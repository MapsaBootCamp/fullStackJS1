import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ unique: true, required: true })
  title: string;

  @Prop({ type: String, ref: 'Category' })
  parentCat: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
