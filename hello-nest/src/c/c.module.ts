import { Module } from '@nestjs/common';
import { BModule } from 'src/b/b.module';
import { C1Service } from './c1.service';

@Module({
  imports: [BModule],
  providers: [C1Service],
})
export class CModule {}
