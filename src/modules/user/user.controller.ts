import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { AuthenticationService } from '../authentication/authentication.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authenticationService: AuthenticationService,
  ) {}
  @Post('')
  async createUser(@Query('id') query, @Body() body) {
    return this.userService.createNewUser(body);
  }
  @Get('')
  async getAllUsers(@Req() request: Request) {
    return this.userService.getAllUsers();
  }
  @Get('/:id')
  async getUserById(@Query('id') query) {
    return this.userService.getUserById(query);
  }
  // verify user via OTP which was sent throw user email
  @Post(':id/auth/verify')
  @HttpCode(HttpStatus.OK)
  async verifyUser(
    @Body('otp') otp,
    @Param('id') id,
    @Res() response: Response,
  ) {
    const user = await this.userService.getUserById(id);
    const data = await this.authenticationService.verifyRegistration(
      otp,
      user,
      response,
    );
    response.json({
      status: 'Congratulations, your account is verified now, Enjoy.',
      data: { ...data, user },
    });
  }
}
