import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientsModule,
  // ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GateWayConfig } from './config/config-service.conf';

// TODO: inject config using rabbit
const configTrip = {
  options: {
    port: process.env.LOGGER_SERVICE_PORT,
    host: process.env.LOGGER_SERVICE_HOST,
  },
};

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOGGER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.rabbitDomainName}:5672`],
          queue: 'log_queue_1',
          /// TODO : how to define reply queue ---> req/res in nest rabbitmq
          // replyQueue: 'henduneh',
          queueOptions: {
            durable: false,
          },
          ...configTrip,
        },
      },
    ]),
    // ClientsModule.register([
    //   {
    //     name: 'USER_SERVICE',
    //     transport: Transport.TCP,
    //     options: {
    //       port: 3002,
    //     },
    //   },
    //   {
    //     name: 'TRIP_SERVICE',
    //     transport: Transport.TCP,
    //     options: {
    //       port: 5001,
    //     },
    //   },
    //   {
    //     name: 'LOGGER_SERVICE',
    //     transport: Transport.TCP,
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [
    GateWayConfig,
    AppService,
    {
      provide: 'TRIP_SERVICE',
      useFactory: (configService: GateWayConfig) => {
        const configTrip = configService.get('trip');
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${process.env.rabbitDomainName}:5672`],
            queue: 'trip_queue',
            queueOptions: {
              durable: false,
            },
          },
          ...configTrip,
        });
      },
      inject: [GateWayConfig],
    },
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: GateWayConfig) => {
        const configTrip = configService.get('user');
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          ...configTrip,
        });
      },
      inject: [GateWayConfig],
    },
    {
      provide: 'MAP_SERVICE',
      useFactory: (configService: GateWayConfig) => {
        const configTrip = configService.get('map');
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${process.env.rabbitDomainName}:5672`],
            queue: 'map_queue',
            queueOptions: {
              durable: false,
            },
          },
          ...configTrip,
        });
      },
      inject: [GateWayConfig],
    },
    // {
    //   provide: 'LOGGER_SERVICE',
    //   useFactory: (configService: GateWayConfig) => {
    //     const configTrip = configService.get('logger');
    //     return ClientProxyFactory.create({
    //       transport: Transport.RMQ,
    //       options: {
    //         urls: [`amqp://${process.env.rabbitDomainName}:5672`],
    //         queue: 'log_deriver_request',
    //         queueOptions: {
    //           durable: false,
    //         },
    //       },
    //       ...configTrip,
    //     });
    //   },
    //   inject: [GateWayConfig],
    // },
  ],
})
export class AppModule {}
