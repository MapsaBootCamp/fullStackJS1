import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Room, RoomDocument } from 'src/location/schemas/location.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop([Room])
  rooms: RoomDocument[];
}

export const UserSchema = SchemaFactory.createForClass(User);
