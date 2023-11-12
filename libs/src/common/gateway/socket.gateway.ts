/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  WsException,
  BaseWsExceptionFilter,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { JWT_SECRET, SOCKET_CORS } from '../../config';
import { JwtService } from '@nestjs/jwt';
import { AllExceptionsSocketFilter } from '../catch-filter/socket-catch.filter';

@WebSocketGateway({
  cors: {
    origin: SOCKET_CORS,
  },
})
@UseFilters(new AllExceptionsSocketFilter())
@UsePipes(new ValidationPipe({ transform: true }))
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayConnection
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly jwtService: JwtService) {
    //
  }

  afterInit(server: Server) {
    console.log('Socket Server ON');
  }

  async handleConnection(client: Socket) {
    try {
      const { token } = client.handshake.auth;
      const data = await this.jwtService.verify(token, {
        secret: JWT_SECRET,
      });

      console.log('SOCKET: client connected');
      await client.join(data.id);
    } catch (err) {
      console.log(err.message);
      this.handleDisconnect(client);
    }
  }

  async handleDisconnect(client: Socket) {
    const { token } = client.handshake.auth;
    console.log(`SOCKET: client disconnect ${client.id}`);
  }
}
