import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UsersCreate {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;
}
