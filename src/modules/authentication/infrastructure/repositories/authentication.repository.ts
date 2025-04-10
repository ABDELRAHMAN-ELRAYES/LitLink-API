import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/prisma.service';

@Injectable()
export class AuthenticationRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
