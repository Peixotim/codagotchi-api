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
import { AuthService } from 'src/auth/auth.service';
import { AuthLoginDTO } from 'src/auth/DTOs/auth-login.dto';
import { UsersCreate } from 'src/users/DTOs/users-create.dto';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'chaos',
}) //Controller do websockets
export class ChaosGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private readonly authService: AuthService) {}
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
  @SubscribeMessage('register')
  public handleRegister(
    @MessageBody() data: UsersCreate,
    @ConnectedSocket() user: Socket,
  ) {
    try {
      const result = this.authService.registerUser(data);

      user.emit('register_sucess', result);
    } catch (err) {
      const error = err as Error;

      user.emit('register_failure', error);
    }
  }

  @SubscribeMessage('login')
  public handleLogin(
    @MessageBody() data: AuthLoginDTO,
    @ConnectedSocket() user: Socket,
  ) {
    try {
      const result = this.authService.loginUser(data);

      user.emit('login_sucess', result);
    } catch (err) {
      const error = err as Error;

      user.emit('login_error', {
        message: error.message,
      });
    }
  }
  public afterInit() {
    console.log('WebSocket Sendo Iniciado ...');
  } // Fala sobre a inicialização do WS
}
