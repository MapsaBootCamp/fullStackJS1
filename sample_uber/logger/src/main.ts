import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { LoggerModule } from './logger.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    LoggerModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.rabbitDomainName}:5672`],
        queue: 'log_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
