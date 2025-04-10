import { Module } from '@nestjs/common';
import { BcryptPasswordService } from './bcrypt-password.service';
import { JwtTokenService } from './jwt-token.service';

@Module({
  providers: [BcryptPasswordService, JwtTokenService],
  exports: [BcryptPasswordService, JwtTokenService],
})
export class SecurityModule {}
