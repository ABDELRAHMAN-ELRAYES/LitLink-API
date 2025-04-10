import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './shared/config/configuration';
import { PrismaService } from './shared/prisma/prisma.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { SecurityModule } from './shared/security/security.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
    PrismaModule,
    UserModule,
    AuthenticationModule,
    SecurityModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
