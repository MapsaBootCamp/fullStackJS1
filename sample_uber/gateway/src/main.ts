import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GateWayConfig } from './config/config-service.conf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const config = new GateWayConfig();
  const config = app.get(GateWayConfig);
  await app.listen(config.get('gateway').port);
}
bootstrap();
