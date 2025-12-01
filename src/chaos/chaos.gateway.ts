import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class ChaosGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return `${client} ,${payload}`;
  }
}
