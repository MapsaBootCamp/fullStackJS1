import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Room } from 'src/location/schemas/location.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  // @Prop()
  // rooms: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Room' }] })
  rooms: Room[];
}

export const UserSchema = SchemaFactory.createForClass(User);
