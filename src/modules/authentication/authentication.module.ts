import { forwardRef, Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { SecurityModule } from 'src/infrastructure/security/security.module';
import { UserModule } from '../user/user.module';
import { MailModule } from 'src/infrastructure/email/email.module';

@Module({
  imports: [SecurityModule, forwardRef(() => UserModule), MailModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
