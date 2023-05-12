import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Exclude()
  _id: any;

  @Expose({ name: 'userId' })
  userId() {
    return this._id.toString();
  }
  username: string;

  @Exclude()
  password: string;

  constructor(user: Partial<UserResponseDto>) {
    Object.assign(this, user);
  }
}
