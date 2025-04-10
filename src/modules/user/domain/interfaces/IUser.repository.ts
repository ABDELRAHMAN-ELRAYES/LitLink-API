// IRepositories

import { IUser } from '../entities/IUser';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  createNewUser: (data: IUser) => Promise<User>;
  getAllUsers: () => Promise<IUser[]>;
  findUserById: (id: string) => Promise<IUser>;
  deleteUserById: (id: string) => void;
  findUserByEmailOrUsername: (emailOrUsername: string) => Promise<IUser>;
}
