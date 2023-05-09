import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

enum ROLE {
  CUSTOMER = 'CUSTOMER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

@Schema()
class Address {
  @Prop()
  city: string;

  @Prop()
  street: string;

  @Prop()
  zipCode: string;
}

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true })
  phoneNumber: string;

  @Prop({ default: ROLE.CUSTOMER })
  role: ROLE;

  @Prop([Address])
  addresses: Address[];
}

export const UserSchema = SchemaFactory.createForClass(User);
