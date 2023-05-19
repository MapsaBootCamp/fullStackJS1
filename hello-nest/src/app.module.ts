import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestGuards } from './common/guards/TestGuard.guards';
import { LoggerModule } from './logger/logger.module';
import { TodoModule } from './todos/todo.module';
import { AuthModule } from './auth/auth.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AModule } from './a/a.module';
import { BModule } from './b/b.module';
import { CModule } from './c/c.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
// import { RoleGuard } from './auth/auth.gaurds';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/todos'),
    ConfigModule.forRoot({
      isGlobal: true,
      fileName: '.env',
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get('JWT_EXPIRE'),
          },
        };
      },
      inject: [ConfigService],
    }),
    TodoModule,
    LoggerModule,
    AuthModule,
    AModule,
    BModule,
    CModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ClassSerializerInterceptor,
    // },
    {
      provide: APP_GUARD,
      useClass: TestGuards,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // },
    ConfigService,
  ],
})
export class AppModule {}
