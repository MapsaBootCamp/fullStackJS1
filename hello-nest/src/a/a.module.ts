import { Module } from '@nestjs/common';
import { A1Service } from './a1.service';
import { A2Service } from './a2.service';

@Module({
  providers: [A1Service, A2Service],
  exports: [A1Service],
})
export class AModule {}
