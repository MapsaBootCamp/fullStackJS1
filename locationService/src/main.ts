import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIOAdapter } from './socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));

  const logger = new Logger('Main file!');
  const PORT = parseInt(configService.get('PORT'));

  await app.listen(PORT);

  logger.log(`server running on port ${PORT}`);
}
bootstrap();
