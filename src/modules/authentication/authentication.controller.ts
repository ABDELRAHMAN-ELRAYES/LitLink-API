import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from 'src/common/dtos/login.dto';
import { BcryptPasswordService } from 'src/infrastructure/security/bcrypt-password.service';
import { JwtTokenService } from 'src/infrastructure/security/jwt-token.service';
import { Response } from 'express';
import { RegisterDto } from 'src/common/dtos/register.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  /**
   * authenticate user to login using email / username and password
   * @param body
   * @param response
   */
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() body: LoginDto, @Res() response: Response) {
    const data = await this.authenticationService.login(body, response);
    response.json(data);
  }

  
  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseInterceptors(AnyFilesInterceptor())
  async register(@Body() body:RegisterDto, @Res() response: Response) {
    const data = await this.authenticationService.register(body,response)
    response.json(data);
  }
}
