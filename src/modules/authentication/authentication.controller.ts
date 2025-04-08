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
import { AuthenticationService } from './authentication.service';
import { LoginDto } from 'src/common/dtos/login.dto';
import { Request, Response } from 'express';
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
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() body: LoginDto, @Res() response: Response) {
    const data = await this.authenticationService.login(body, response);
    response.json(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseInterceptors(AnyFilesInterceptor())
  async register(@Body() body: RegisterDto,@Req() request: Request) {
    const data = await this.authenticationService.register(body, request);
    return data;
  }

}
