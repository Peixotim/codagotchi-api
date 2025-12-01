import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entity/users.entity';
import { Repository } from 'typeorm';
import { UsersCreate } from './DTOs/users-create.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  public async createUser(request: UsersCreate): Promise<UsersEntity> {
    if (!request) {
      throw new BadGatewayException(
        `Error, you're not passing anything in the request!`,
      );
    }

    try {
      const saltRounds: number = 12;
      const salt: string = await bcrypt.genSalt(saltRounds);
      const hash: string = await bcrypt.hash(request.password, salt);

      const newUser = this.userRepository.create({
        name: request.name,
        mail: request.mail,
        password: hash,
      });

      const savedUser = await this.userRepository.save(newUser);

      return savedUser;
    } catch (err) {
      const erro = err as Error;
      throw new InternalServerErrorException(erro);
    }
  }
}
