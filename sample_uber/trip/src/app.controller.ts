import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { TripRequest } from './dto/trip.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('trip')
  addTrip(data: TripRequest) {
    console.log('TRIP SERVICE - ', JSON.stringify(data));
  }

  @EventPattern('get_user_kafka')
  getUser(data: any) {
    console.log('seda zade shod');
    this.appService.getUserInfo(0);
  }
}
