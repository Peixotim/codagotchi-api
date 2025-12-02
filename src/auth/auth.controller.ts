import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './DTOs/auth-login.dto';
import { UsersCreate } from 'src/users/DTOs/users-create.dto';
import { UsersEntity } from 'src/users/entity/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(request: UsersCreate): Promise<UsersEntity> {
    return await this.authService.registerUser(request);
  }

  @Post('login')
  public async login(request: AuthLoginDTO): Promise<{ acess_token }> {
    return await this.authService.loginUser(request);
  }
}
