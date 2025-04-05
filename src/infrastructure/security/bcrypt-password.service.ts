import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptPasswordService {
  // hash user password
  hash(text: string): Promise<string> {
    return bcrypt.hash(text, 12);
  }

  // check if the user recieved input is similar as the actual user passord
  async isValidPassword(
    hashedPassword: string,
    receivedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(receivedPassword, hashedPassword);
  }
}
