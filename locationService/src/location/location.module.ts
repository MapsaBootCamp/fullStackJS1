import { Module } from '@nestjs/common';
import { LocationGateWay } from './location.gateway';

@Module({
  imports: [],
  providers: [LocationGateWay],
})
export class LocationModule {}
