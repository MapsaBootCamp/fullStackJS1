import { Module } from '@nestjs/common';
import { AModule } from 'src/a/a.module';
import { A1Service } from 'src/a/a1.service';
import { B1Service } from './b1.service';

@Module({
  imports: [AModule],
  providers: [B1Service, A1Service],
  exports: [B1Service, A1Service],
})
export class BModule {}
