import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Username or Email is required to Login!' })
  @IsString()
  emailOrUsername!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password!: string;
}
