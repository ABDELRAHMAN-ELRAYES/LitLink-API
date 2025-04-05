import { Injectable } from '@nestjs/common';
import { AuthenticationRepository } from 'src/infrastructure/repositories/authentication.repository';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly auhtenticationRepository: AuthenticationRepository,
  ) {}

  // check if the provided email or username is registered in DB
  async returnIdIfRegistered(email?: string, username?: string) {
    return this.auhtenticationRepository.returnIdIfRegistered(
      email,
      username,
    );
;
  }

  // validate registered user password
  async validatePassword() {
    // const user = await this.auhtenticationRepository.
  }
}
