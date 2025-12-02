import { HttpException, UseFilters, UsePipes } from '@nestjs/common';
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
import { WebsocketExceptionsFilter } from 'src/common/filters/ws-exception.filter';
import { WsValidationPipe } from 'src/pipe/ws-validation.pipe';
import { UsersCreate } from 'src/users/DTOs/users-create.dto';

@UseFilters(new WebsocketExceptionsFilter())
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
  }

  public handleDisconnect(user: Socket) {
    console.log(`Client Disconnect : ${user.id}`);
    user.emit('connection', { message: 'Connected to chaos namespace' });
  }

  @SubscribeMessage('register')
  @UsePipes(new WsValidationPipe())
  public async handleRegister(
    @MessageBody() data: UsersCreate,
    @ConnectedSocket() user: Socket,
  ) {
    try {
      console.log('🔥 REGISTER RECEIVED', data);

      const result = await this.authService.registerUser(data);

      user.emit('register_success', result);
    } catch (error) {
      if (error instanceof HttpException) {
        user.emit('register_failure', {
          message: error.message,
          status: error.getStatus(),
        });
      } else {
        user.emit('register_failure', {
          message: 'Internal server error',
        });
      }
    }
  }

  @SubscribeMessage('login')
  @UsePipes(new WsValidationPipe())
  public async handleLogin(
    @MessageBody() data: AuthLoginDTO,
    @ConnectedSocket() user: Socket,
  ) {
    try {
      const result = await this.authService.loginUser(data);

      user.emit('login_sucess', result);
    } catch (err) {
      const error = err as Error;

      user.emit('login_error', {
        message: error.message,
        name: error.name,
      });
    }
  }
  public afterInit() {
    setTimeout(() => {
      console.log('WebSocket Sendo Iniciado ...');
    }, 1000);
  } // Fala sobre a inicialização do WS

  @SubscribeMessage('ping')
  ping(@ConnectedSocket() user: Socket) {
    console.log('🔥 PING RECEIVED');
    user.emit('pong', { ok: true });
  }
}
