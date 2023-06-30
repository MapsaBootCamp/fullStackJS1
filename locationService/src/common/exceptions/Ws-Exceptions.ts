import { WsException } from '@nestjs/websockets';

export class WsUnauthorizedException extends WsException {
  constructor(message: string | unknown) {
    const error = {
      type: 'UnAuthorized',
      message,
    };
    super(error);
  }
}
