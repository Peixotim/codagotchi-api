import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException, HttpException)
export class WebsocketExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient<Socket>();

    let error: unknown;

    if (exception instanceof WsException) {
      error = exception.getError();
    } else if (exception instanceof HttpException) {
      error = exception.getResponse();
    } else {
      error = { message: 'Internal Server Error' };
    }

    let details: Record<string, any>;
    if (typeof error === 'object' && error !== null) {
      details = { ...error };
    } else {
      details = { message: String(error) };
    }

    client.emit('exception', {
      status: 'error',
      ...details,
    });
  }
}
