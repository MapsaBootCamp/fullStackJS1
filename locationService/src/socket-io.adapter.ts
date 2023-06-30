import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Server, ServerOptions } from 'socket.io';
import { AuthedSocket } from './common/type';

export class SocketIOAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketIOAdapter.name);
  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const cors = {
      origin: [`http://localhost:8000`],
    };

    const optionsWithCustomCORS: ServerOptions = {
      ...options,
      cors,
    };

    const jwtService = this.app.get(JwtService);

    const server: Server = super.createIOServer(port, optionsWithCustomCORS);

    server.of('location').use(jwtTokenMiddleware(jwtService, this.logger));

    return server;
  }
}

const jwtTokenMiddleware =
  (jwtService: JwtService, logger: Logger) => (socket: AuthedSocket, next) => {
    const token = socket.handshake.auth.token;

    logger.debug(`Validating auth token before connection: ${token}`);
    try {
      const payload = jwtService.verify(token);
      socket.username = payload.username;
      next();
    } catch {
      next(new Error('Forbidden'));
    }
  };
