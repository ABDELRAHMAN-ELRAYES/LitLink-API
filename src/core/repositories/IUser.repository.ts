export interface IUserRepository {
  createUser: (
    name: string,
    username: string,
    email: string,
    password: string,
  ) => Promise<{
    id: string,
    name: string,
    username: string,
    email: string,
    password: string,
  }>;
  getAllUsers: () => Promise<
    {
      id: string,
      name: string,
      username: string,
      email: string,
      password: string,
    }[]
  >;
  getUserById: (id: string) => Promise<{
    id: string,
    name: string,
    username: string,
    email: string,
    password: string,
  }| null>;
}
