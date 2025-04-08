import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptPasswordService {
  // hash user password
  hash(text: string): Promise<string> {
    return bcrypt.hash(text, 12);
  }

  // comparing hashed text with a normal one
  async areMatched(hashedText: string, plainText: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedText);
  }
}
