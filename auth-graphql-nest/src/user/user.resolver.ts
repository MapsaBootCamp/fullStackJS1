import { Inject } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Ctx } from 'src/common/types';
import { RegisterType, User } from './user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  @Inject(UserService)
  private readonly userService: UserService;

  @Query(() => [User])
  userList() {
    return this.userService.getAllUsers();
  }

  @Mutation(() => User)
  register(@Args('input') input: RegisterType) {
    return this.userService.register(input);
  }

  @Query(() => User)
  login(@Args('input') input: RegisterType, @Context() ctx: Ctx) {
    const { username, password } = input;
    return this.userService.login(username, password, ctx);
  }
}
