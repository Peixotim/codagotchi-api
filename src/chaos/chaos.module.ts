import { Module } from '@nestjs/common';
import { ChaosGateway } from './chaos.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { ChaosService } from './chaos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChaosEntity } from './entity/chaos.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ChaosEntity])],
  providers: [ChaosGateway, ChaosService],
  exports: [ChaosGateway],
})
export class ChaosModule {}
