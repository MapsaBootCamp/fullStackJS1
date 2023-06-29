import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @MessagePattern({ cmd: 'list_drivers' })
  // getDriverList(data: any) {
  //   return this.appService.getDriverList();
  // }

  @MessagePattern('get_user_ahmagh')
  getUser(data: any) {
    const { id } = data;
    return this.appService.getUser(id);
  }
}
