import { get } from 'lodash';
import { HttpException, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { async } from 'rxjs';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (jwtService: JwtService) => ({
        playground: {
          settings: {
            'request.credentials': 'include', // Otherwise cookies won't be sent
          },
        },
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        context: ({ req, res }) => {
          const token = get(req.cookies, 'token');
          console.log(token);
          const user = jwtService.verify(token);
          console.log(user);
          req.user = user;
          return { req, res };
        },
      }),
      inject: [JwtService],
    }),
    JwtModule.register({
      global: true,
      secret: 'abc123',
      signOptions: {
        expiresIn: '2d',
      },
    }),
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
