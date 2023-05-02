import { Exclude, Expose } from 'class-transformer';
import { User } from '../schemas/user.schema';

export class UserResponseDto {
  @Exclude()
  _id: string;
  username: string;

  constructor(private user: Partial<User>) {
    Object.assign(this, user);
  }
}
