import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
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
}
