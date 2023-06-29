import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  getUserInfo(id: number) {
    this.userClient.send('get_user', { id }).subscribe((user) => {
      console.log(`user info: ${user.username}`);
    });
  }

  onModuleInit() {
    this.userClient.subscribeToResponseOf('get_user');
  }
}
