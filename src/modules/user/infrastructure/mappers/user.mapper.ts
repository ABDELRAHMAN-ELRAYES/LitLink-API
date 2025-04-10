// converter from user entity to prisma client model and vice versa

import { User as PrismaUser } from '@prisma/client';
import { User } from '../../domain/entities/user.entity';

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return new User(
      raw.firstName,
      raw.lastName,
      raw.email,
      raw.birthdate,
      raw.password,
      raw.joinedDate,
      raw.username,
      raw.otp,
      raw.isOtpVerified,
      raw.otpExpiresAt,
      raw.id,
    );
  }

  static toPersistence(
    entity: User,
  ): Omit<PrismaUser, 'id' | 'joinedDate' | 'isOtpVerified'> {
    return {
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      birthdate: entity.birthdate,
      username: entity.username || null,
      password: entity.password,
      otp: entity.otp || null,
      otpExpiresAt: entity.otpExpiresAt || null,
    };
  }
}
