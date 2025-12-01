import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChaosEntity } from './entity/chaos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChaos } from './DTOs/create-chaos.dto';

@Injectable()
export class ChaosService {
  constructor(
    @InjectRepository(ChaosEntity)
    private readonly chaosRepository: Repository<ChaosEntity>,
  ) {}

  public async createChaos(request: CreateChaos): Promise<ChaosEntity> {
    if (!request) {
      throw new BadRequestException(
        `Error, you're not passing anything in the request!`,
      );
    }
    try {
      const newChaos = this.chaosRepository.create({
        name: request.name,
        status: request.status,
        type: request.type,
        color: request.color,
      });

      const savedChaos = await this.chaosRepository.save(newChaos);

      return savedChaos;
    } catch (error) {
      console.error(error);
      // if (
      //   error instanceof JsonWebTokenError ||
      //   error instanceof TokenExpiredError
      // ) {
      //   throw new BadRequestException('Invalid or expired token');
      // }
      // throw error;
    }
  }
}
