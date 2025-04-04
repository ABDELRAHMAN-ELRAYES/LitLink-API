import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUser(
    name: string,
    username: string,
    email: string,
    password: string,
  ) {
    const newUser = await this.userRepository.createUser(name, username, email, password);
    return newUser;
  }
  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
  async getUserById(id: string) {
    const user = await this.userRepository.getUserById(id);
    return user;
  }
}
