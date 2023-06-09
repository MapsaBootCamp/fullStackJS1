import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TripRequest } from './dto/trip-request.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly clientUserService: ClientProxy,
    @Inject('TRIP_SERVICE') private readonly clientTripService: ClientProxy,
    @Inject('MAP_SERVICE') private readonly clientMapService: ClientProxy,
    @Inject('LOGGER_SERVICE') private readonly clientLoggerService: ClientProxy,
  ) {}

  logTripRequest(tripRequest: TripRequest, username: string) {
    const payload = { ...tripRequest, username };
    this.clientLoggerService.emit('log_trip_request', payload);
  }

  getTripRequests(username: string) {
    return this.clientLoggerService.send(
      { cmd: 'trip_request_log' },
      { username },
    );
  }
  getDrivers(username: string) {
    this.clientLoggerService.emit('log_deriver_request', { username }); /// event-pattern
    return this.clientUserService.send({ cmd: 'list_drivers' }, {}); /// message-pattern
  }

  getBill(body: any) {
    return this.clientMapService.send({ cmd: 'get_bill_distance' }, body);
  }
}
