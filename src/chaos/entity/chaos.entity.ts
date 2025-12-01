import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChaosStatus } from '../enums/chaos-status.enum';
import { ChaosType } from '../enums/chaos-type.enum';

@Entity({ name: 'chaos' })
export class ChaosEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'enum', enum: ChaosStatus, default: ChaosStatus.ALIVE })
  status: ChaosStatus;

  @Column({ type: 'enum', enum: ChaosType })
  type: ChaosType;

  @Column({ type: 'varchar' })
  color: string;

  @Column({ type: 'int', default: 100 })
  health: number; //Vida

  @Column({ type: 'int', default: 100 })
  fullness: number; //Fome

  @Column({ type: 'int', default: 100 })
  energy: number; //Energia

  @Column({ type: 'int', default: 100 })
  happiness: number; //Felicidade

  @Column({ type: 'int', default: 100 })
  cleanliness: number; //Limpeza

  @Column({ type: 'int', default: 1 })
  level: number;

  @Column({ type: 'int', default: 0 })
  xp: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'date', nullable: false })
  deathDate: Date;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  lastTickProcessedAt: Date;
}
