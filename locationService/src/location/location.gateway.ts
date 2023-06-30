import { Logger, LoggerService } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/location' })
export class LocationGateWay
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: LoggerService = new Logger(LocationGateWay.name);

  @WebSocketServer()
  io: Server;

  afterInit() {
    this.logger.log('gateway init shod!');
  }

  handleConnection(socket: Socket) {
    this.logger.log(`a user with ${socket.id} connected!`);
    socket.broadcast.emit('chat message', 'ye nafar connect shod');
  }

  handleDisconnect(socket: Socket) {
    socket.broadcast.emit('chat message', `ye nafar dis shod`);
  }

  @SubscribeMessage('send message')
  handleSendMessage(socket: Socket, data: string) {
    this.logger.log(data);
    // this.io.emit('chat message', data);
    socket.broadcast.emit('chat message', data);
    socket.emit('chat message', { message: 'data send shod' });
  }
}
