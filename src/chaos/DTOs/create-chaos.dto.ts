import { IsEnum, IsString } from 'class-validator';
import { ChaosStatus } from '../enums/chaos-status.enum';
import { ChaosType } from '../enums/chaos-type.enum';

export class CreateChaos {
  @IsString()
  name: string;

  @IsEnum(ChaosStatus)
  status: ChaosStatus;

  @IsEnum(ChaosType)
  type: ChaosType;

  @IsString()
  color: string;
}
