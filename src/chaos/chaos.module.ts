import { Module } from '@nestjs/common';
import { ChaosGateway } from './chaos.gateway';

@Module({
  imports: [],
  providers: [ChaosGateway],
})
export class ChaosModule {}
