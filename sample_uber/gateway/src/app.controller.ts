import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TripRequest } from './dto/trip-request.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('trip-request')
  tripRequest(
    @Body() tripRequest: TripRequest,
    @Query('username') username: string,
  ) {
    console.log(
      'GateWay - ',
      JSON.stringify(tripRequest),
      ' username: ',
      username,
    );
    this.appService.logTripRequest(tripRequest, username);
  }

  @Get('trip-request-log')
  tripRequestLogs(@Query('username') username: string) {
    return this.appService.getTripRequests(username);
  }

  @Get('list-drivers')
  getDriver(@Query('username') username: string) {
    return this.appService.getDrivers(username);
  }

  @Post('bill-distance')
  getBill(@Body() body: any) {
    return this.appService.getBill(body);
  }
}
