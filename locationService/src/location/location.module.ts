import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { LocationGateWay } from './location.gateway';
import { LocationService } from './location.service';
import { Room, RoomSchema } from './schemas/location.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  providers: [LocationGateWay, LocationService],
})
export class LocationModule {}
