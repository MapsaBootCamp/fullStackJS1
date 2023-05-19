import { Injectable } from '@nestjs/common';
import { A1Service } from 'src/a/a1.service';
import { B1Service } from 'src/b/b1.service';

@Injectable()
export class C1Service {
  constructor(private readonly a1: A1Service, private readonly b1: B1Service) {}
}
