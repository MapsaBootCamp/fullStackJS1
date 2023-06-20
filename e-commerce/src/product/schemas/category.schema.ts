import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@ObjectType()
@Schema({ timestamps: true })
export class Category {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop({ unique: true, required: true })
  title: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String, ref: 'Category' })
  parentCat: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
