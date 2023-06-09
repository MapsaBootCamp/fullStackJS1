import { Injectable } from '@nestjs/common';
import { TripRequestLog } from './dto/trip-request-log.dto';
import { ITripRequestLog } from './interfaces/log-trip-request.interfce';

@Injectable()
export class AppService {
  private readonly logData: ITripRequestLog[] = [];

  logTripRequest(data: TripRequestLog) {
    const logData = { ...data, timeStamp: new Date() };
    console.log('Logger Service - ', JSON.stringify(logData));
    this.logData.push(logData);
  }

  getTripRequestLog(username: string) {
    return this.logData.filter((item) => item.username === username);
  }
}
