import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationService } from './application/services/authentication.service';
import { LoginDto } from 'src/modules/authentication/application/dto/login.dto';
import { Request, Response } from 'express';
import { RegisterDto } from 'src/modules/user/application/dto/register.dto';
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
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() body: LoginDto, @Res() response: Response) {
    const data = await this.authenticationService.login(body, response);
    response.json(data);
  }
  /**
   * register new user
   * @param {RegisterDto} body
   * @param {Request} request
   * @returns
   */
  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseInterceptors(AnyFilesInterceptor())
  async register(@Body() body: RegisterDto, @Req() request: Request) {
    const data = await this.authenticationService.register(body, request);
    
    return data;
  }

  @Post('/reset-password')
  async forgetPassword() {
    // 1- send email with the link which will be used to reset password
    // 2- reset password
  }
}
