import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { IUserRepository } from 'src/modules/user/domain/interfaces/IUser.repository';
import { IUser } from 'src/modules/user/domain/entities/IUser';
import { User } from '../../domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * create new user
   * @returns
   */
  async createNewUser(userData): Promise<User> {
    const userEntity = new User(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.birthdate,
      userData.password,
      new Date(),
      userData.username,
      userData.otp,
      false,
      userData.otpExpiresAt,
      null,
    );
    const prismaUser = UserMapper.toPersistence(userEntity);
    const user = await this.prismaService.user.create({
      data: prismaUser,
    });
    // console.log(userEntity);
    // console.log('/***************************************/');
    // console.log(prismaUser);
    // console.log('/***************************************/');
    // console.log(user);

    return UserMapper.toDomain(user);
  }
  async getAllUsers() {
    return this.prismaService.user.findMany();
  }

  async deleteUserById(id: string) {
    await this.prismaService.user.delete({ where: { id: id } });
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
    //! there is an error that the field (isOtpVerified) doesn't change from the first time.
    const user = await this.prismaService.user.update({
      where: { id },
      data: { isOtpVerified: true },
    });
    if (!user) {
      throw new NotFoundException('This Email or User is not found');
    }
    return user;
  }
}
