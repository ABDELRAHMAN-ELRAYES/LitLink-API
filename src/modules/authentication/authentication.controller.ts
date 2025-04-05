import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from 'src/common/dtos/signin.dto';
import { BcryptPasswordService } from 'src/infrastructure/security/bcrypt-password.service';
import { JwtTokenService } from 'src/infrastructure/security/jwt-token.service';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly bcryptPasswordService: BcryptPasswordService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  @Post('signin')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signin(@Body() body: SignInDto) {
    // 1- receive user email / username and password
    const { username, email, password } = body;

    // 2- check if email / username is registered\
    const user = await this.authenticationService.returnIdIfRegistered(
      email,
      username,
    );
    // 3- if email / username is not found return exception
    if (!user) {
      throw new UnauthorizedException();
    }
    //! Demo for testing only
    const hashedPassword =
      '$2b$12$4HISyw4Djdd6KSYYJ6EVbuYow1S4XFzKfWU1GWfwCBK6YQRd7sgFu';

    // 4- if email / username is found validate password
    const isValidPassword = await this.bcryptPasswordService.isValidPassword(
      hashedPassword,
      password,
    );

    // 5- if the password is not correct return exception
    if (!isValidPassword) {
      throw new BadRequestException();
    }
    // 6- if the password is correct create token and send response
    const { id } = user;
    const token  = await this.jwtTokenService.signToken(id);

  
    return { user, hashedPassword, isValidPassword,token };
  }
}
