import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChaosGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return `${client} ,${payload}`;
  }
}
