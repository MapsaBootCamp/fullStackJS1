import { Injectable } from '@nestjs/common';
import { A1Service } from 'src/a/a1.service';

@Injectable()
export class B1Service {
  constructor(private readonly a1: A1Service) {}
}
