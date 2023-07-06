import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

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
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ default: ROLE.CUSTOMER })
  role: ROLE;

  @Prop([Address])
  addresses: Address[];

  @Prop({ default: false })
  active: boolean;

  comparePassword: (string) => boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

//// hooks, methods

UserSchema.index({
  email: 1,
});

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  console.log('saved user info');
  next();
});

UserSchema.methods.comparePassword = async function (inputPassword: string) {
  return await bcrypt.compare(inputPassword, this.password);
};
