// for validation logic that can't be implemented using DTO builtin decorators
import { RegisterDto } from '../../application/dto/register.dto';

export class UserValidator {
  static validateCreate(dto: RegisterDto) {
    if (!dto.firstName || !dto.email) throw new Error('Missing fields');
    if (!dto.email.includes('@')) throw new Error('Invalid email');
  }
}
