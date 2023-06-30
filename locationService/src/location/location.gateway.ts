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
    const user = await this.userService.findUserByUsername(socket.username);

    const rooms = user.toObject().rooms;

    rooms.forEach((room) => {
      socket.join(room.toString());
      this.logger.log(
        `room size ${room.toString()}: ${
          this.io.adapter.rooms.get(room.toString()).size
        }`,
      );
    });

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
    this.io.to('649f00b920ee440915df75d1').emit('chat message', 'salam');
    socket.broadcast.emit('chat message', data);
    socket.emit('chat message', { message: 'data send shod' });
  }

  @SubscribeMessage('send.room')
  sendMessageToRoom(socket: Socket, data: any) {
    this.io.to(data.roomId).emit('chat message', data.message);
    // socket.broadcast.emit('chat message', data.message);
    // socket.emit('chat message', { message: 'data send shod' });
  }

  @SubscribeMessage('create.room')
  async createRoom(socket: AuthedSocket, data: string) {
    const room = await this.locationService.createRoom(data);
    console.log(room._id);
    await this.userService.addUserToRoom(socket.username, room._id);
  }

  @SubscribeMessage('add.user.room')
  async addUserRoom(
    socket: AuthedSocket,
    data: { username: string; roomId: string },
  ) {
    const { username, roomId } = data;
    console.log({ username, roomId });
    try {
      await this.userService.addUserToRoom(username, roomId);
      this.logger.log('user add shod');
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
