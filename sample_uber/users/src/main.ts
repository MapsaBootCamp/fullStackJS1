import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: {
  //     host: '0.0.0.0',
  //     port: +process.env.USER_SERVICE_PORT,
  //   },
  // });
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'mapsa-app',
          brokers: ['kafka:9092'],
        },
        consumer: {
          groupId: 'group-2',
        },
      },
    },
  );
  // await app.startAllMicroservices();
  await app.listen();
}
bootstrap();
