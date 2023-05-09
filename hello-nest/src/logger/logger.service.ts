import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  logger(message: string, level: string) {
    console.log(`${new Date()}-${level}: ${message}`);
  }
}
