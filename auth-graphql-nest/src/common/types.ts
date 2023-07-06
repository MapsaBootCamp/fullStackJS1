import { Request, Response } from 'express';

export type Ctx = {
  req: Request;
  res: Response;
};
