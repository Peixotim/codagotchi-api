import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @IsString()
  @MaxLength(100)
  password: string;
}
