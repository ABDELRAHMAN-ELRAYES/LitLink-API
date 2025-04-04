import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IUserRepository } from 'src/core/repositories/IUser.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 
   * @param name 
   * @param username 
   * @param email 
   * @param password 
   * @returns 
   */
  async createUser(
    name: string,
    username: string,
    email: string,
    password: string,
  ) {
    return this.prismaService.user.create({
      data: {
        name,
        username,
        email,
        password,
      },
    });
  }
  async getAllUsers() {
    return this.prismaService.user.findMany();
  }
  async getUserById(id: string) {
    return this.prismaService.user.findFirst({ where: { id } });
  }
}