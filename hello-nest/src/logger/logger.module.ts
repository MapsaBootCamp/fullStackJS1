import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

const LoggerProvider = { provide: 'LOGGER', useClass: LoggerService };

@Global()
@Module({
  imports: [],
  providers: [LoggerProvider],
  exports: [LoggerProvider],
})
export class LoggerModule {}
