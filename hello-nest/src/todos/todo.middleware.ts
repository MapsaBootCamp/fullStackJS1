import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class TestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('MIDDLEWARE');
    next();
  }
}
