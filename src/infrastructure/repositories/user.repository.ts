import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IUserRepository } from 'src/core/repositories/IUser.repository';
import { IUser } from 'src/core/interfaces/IUser';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * create new user
   * @returns
   */
  async createNewUser(data: IUser) {
    return this.prismaService.user.create({
      data,
    });
  }
  async getAllUsers() {
    return this.prismaService.user.findMany();
  }
  // Find user by the provided id
  async findUserById(id: string) {
    return this.prismaService.user.findFirst({ where: { id } });
  }
  // Find user by the provided email or username
  async findUserByEmailOrUsername(emailOrUsername: string) {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });
  }
}
