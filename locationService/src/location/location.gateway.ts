import { Logger, LoggerService, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { GatewayGuard } from 'src/common/guards/gateway.guards';
import { AuthedSocket } from 'src/common/type';
import { UserService } from 'src/user/user.service';
import { LocationService } from './location.service';
import mongoose, { Types, ObjectId } from 'mongoose';

@WebSocketGateway({ namespace: '/location' })
export class LocationGateWay
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: LoggerService = new Logger(LocationGateWay.name);

  constructor(
    private readonly userService: UserService,
    private readonly locationService: LocationService,
  ) {}

  @WebSocketServer()
  io: Namespace;

  afterInit() {
    this.logger.log('gateway init shod!');
  }

  async handleConnection(socket: AuthedSocket) {
    const rooms = (await this.userService.findUserByUsername(socket.username))
      .rooms;

    this.logger.log('rooms: ', rooms);

    rooms.forEach((room) => {
      socket.join(room._id.toString());
    });

    this.logger.log(
      `room size ${rooms[0]._id.toString()}: `,
      this.io.adapter.rooms.get(rooms[0]._id.toString()).size,
    );

    this.logger.log(`a user with ${socket.username} connected!`);
    socket.broadcast.emit('chat message', 'ye nafar connect shod');
  }

  handleDisconnect(socket: Socket) {
    socket.broadcast.emit('chat message', `ye nafar dis shod`);
  }

  @UseGuards(GatewayGuard)
  @SubscribeMessage('send message')
  handleSendMessage(socket: Socket, data: string) {
    this.logger.log(data);
    // this.io.emit('chat message', data);
    socket.broadcast.emit('chat message', data);
    socket.emit('chat message', { message: 'data send shod' });
  }

  @SubscribeMessage('create.room')
  async createRoom(socket: AuthedSocket, data: string) {
    this.logger.log(data);
    const room = await this.locationService.createRoom(data);
    await this.userService.addUserToRoom(socket.username, room._id);
  }

  @SubscribeMessage('add.user.room')
  async addUserRoom(socket: AuthedSocket, data: any) {
    this.logger.log(data);
    const { username, roomId } = data;
    try {
      await this.userService.addUserToRoom(
        username,
        Types.ObjectId.createFromHexString(roomId),
      );
      this.logger.log('user add shod');
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
