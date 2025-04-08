import { Injectable, NotFoundException } from '@nestjs/common';
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
    const user = await this.prismaService.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException('This Email or User is not found');
    }
    return user;
  }
  // Find user by the provided email or username
  async findUserByEmailOrUsername(emailOrUsername: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });
    if (!user) {
      throw new NotFoundException('This Email or Username is found');
    }
    return user;
  }
  // Find user by the provided email or username
  async findUserByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }
  // Update user  OTP verification status
  async updateUserOtpStatus(id: string) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: { isOtpVerified: true },
    });
    if (!user) {
      throw new NotFoundException('This Email or User is not found');
    }
  }
}
