import { Injectable } from '@nestjs/common';
import { IUser } from 'src/modules/user/domain/entities/IUser';
import { UserRepository } from 'src/modules/user/infrastructure/repositories/user.repository';

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
  async deleteUserById(id: string) {
    await this.userRepository.deleteUserById(id);
    console.log('user is deleted ,Successfully');
  }
}
