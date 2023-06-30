import { Socket } from 'socket.io';

export type AuthPayload = {
  username: string;
};

export type AuthedSocket = Socket & AuthPayload;
