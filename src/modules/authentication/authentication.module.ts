import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { SecurityModule } from 'src/infrastructure/security/security.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SecurityModule,UserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
