import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsUnauthorizedException } from '../exceptions/Ws-Exceptions';
import { AuthedSocket } from '../type';

@Injectable()
export class GatewayGuard implements CanActivate {
  private readonly logger = new Logger(GatewayGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket: AuthedSocket = context.switchToWs().getClient();
    // const token = socket.handshake.auth.token;

    // if (!token) {
    //   this.logger.error('no authorization token');
    //   throw new WsUnauthorizedException('needs token!');
    // }

    try {
      // const payload = await this.jwtService.verify(token);
      // const { username } = payload;
      if (socket.username === 'Kobra') {
        throw new Error('nemishe');
      }
      // this.logger.debug(`user ${username}`);
      return true;
    } catch (error) {
      this.logger.log(error.message);
      throw new WsUnauthorizedException(error.message);
    }
  }
}
