import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'chaos',
}) //Controller do websockets
export class ChaosGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  public testandoSocket(
    @ConnectedSocket() user: Socket,
    @MessageBody() data: string,
  ) {
    console.log({
      user: user.id,
      data: data,
    });
    return {
      user: user.id,
      data: data,
    };
  }

  public handleConnection(user: Socket) {
    console.log(`Client connected: ${user.id}`);
    user.emit('connection', { message: 'Connected to chaos namespace' });
  } //Fala o user que foi conectado

  public handleDisconnect(user: Socket) {
    console.log(`Client Disconnect : ${user.id}`);
    user.emit('connection', { message: 'Connected to chaos namespace' });
  }

  public afterInit() {
    console.log('WebSocket Sendo Iniciado ...');
  } // Fala sobre a inicialização do WS
}
