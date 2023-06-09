import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  // ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GateWayConfig } from './config/config-service.conf';

@Module({
  imports: [
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
          transport: Transport.TCP,
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
          transport: Transport.TCP,
          ...configTrip,
        });
      },
      inject: [GateWayConfig],
    },
    {
      provide: 'LOGGER_SERVICE',
      useFactory: (configService: GateWayConfig) => {
        const configTrip = configService.get('logger');
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          ...configTrip,
        });
      },
      inject: [GateWayConfig],
    },
  ],
})
export class AppModule {}
