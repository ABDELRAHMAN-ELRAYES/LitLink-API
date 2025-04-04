import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('')
  async createUser(@Query('id') query, @Body() body) {
    const { username, name, email, password } = body;
    return this.userService.createUser(name, username, email, password);
  }
  @Get('')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get('/:id')
  async getUserById(@Query('id') query) {
    return this.userService.getUserById(query);
  }
}
