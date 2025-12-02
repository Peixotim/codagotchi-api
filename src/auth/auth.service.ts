import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersCreate } from 'src/users/DTOs/users-create.dto';
import { UsersEntity } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDTO } from './DTOs/auth-login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async registerUser(request: UsersCreate): Promise<UsersEntity> {
    return await this.usersService.createUser(request);
  }

  public async loginUser(
    request: AuthLoginDTO,
  ): Promise<{ acess_token: string }> {
    if (!request) {
      throw new BadGatewayException(
        `Error : you're not passing anything in the request!`,
      );
    }
    const user = await this.usersService.findByMail(request.mail);

    if (!user) {
      throw new NotFoundException(
        `Error : No one was found with this email address!`,
      );
    }

    try {
      const isMatch = await bcrypt.compare(request.password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException(
          `Error:  please check your email and password!`,
        );
      }
      const payload = {
        sub: user.uuid,
        mail: user.mail,
      };

      const token = await this.jwtService.signAsync(payload);

      return {
        acess_token: token,
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
