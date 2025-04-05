import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class SignInDto {
  @ValidateIf((o) => !o.username)
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @ValidateIf((o) => !o.email)
  @IsNotEmpty({ message: 'Username is required when email is not provided' })
  @IsString()
  username?: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password!: string;
}
