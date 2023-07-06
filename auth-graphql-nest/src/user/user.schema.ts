import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: number;

  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class RegisterType {
  @Field()
  username: string;

  @Field()
  password: string;
}
