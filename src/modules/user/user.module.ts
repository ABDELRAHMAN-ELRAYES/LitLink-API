import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [forwardRef(() => AuthenticationModule)],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
