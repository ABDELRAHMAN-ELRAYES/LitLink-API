import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuthenticationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // check if the provided email or username is registered in DB
  returnIdIfRegistered(email?: string, username?: string) {
    return this.prismaService.user.findFirst({
      where: {
        AND: [{ email }, { username }],
      },
      select: {
        password: true,
        id: true,
      },
    });
  }

  // return the passord of the registered user to be validated
  returnUserPassord(email: string, username: string) {
    return this.prismaService.user.findFirst({
      where: {
        AND: [{ email }, { username }],
      },
      select: { password: true },
    });
  }
}
