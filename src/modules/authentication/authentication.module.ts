import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthenticationRepository } from 'src/infrastructure/repositories/authentication.repository';
import { SecurityModule } from 'src/infrastructure/security/security.module';

@Module({
  imports: [SecurityModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationRepository],
})
export class AuthenticationModule {}
