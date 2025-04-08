import { RegisterDto } from 'src/common/dtos/register.dto';
import { IUser } from '../interfaces/IUser';

export interface IUserRepository {
  createNewUser: (data: IUser) => Promise<IUser>;
  getAllUsers: () => Promise<IUser[]>;
  findUserById: (id: string) => Promise<IUser | null>;
  findUserByEmailOrUsername: (emailOrUsername: string) => Promise<IUser | null>;
}
