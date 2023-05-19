import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    ProductModule,
    OrderModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log(process.env.MONGO_URL);
  }
}
