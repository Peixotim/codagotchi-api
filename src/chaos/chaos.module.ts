import { Module } from '@nestjs/common';
import { ChaosGateway } from './chaos.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [ChaosGateway],
})
export class ChaosModule {}
