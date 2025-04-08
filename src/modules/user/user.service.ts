import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/common/dtos/register.dto';
import { IUser } from 'src/core/interfaces/IUser';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async createNewUser(data: IUser) {
    const newUser = await this.userRepository.createNewUser(data);
    return newUser;
  }
  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
  async getUserById(id: string) {
    const user = await this.userRepository.findUserById(id);
    return user;
  }
}
