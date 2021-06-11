import { User } from '../domain/user/User';

interface IUsersRepository {
  create(user: User): Promise<void>;
  save(user: User): Promise<void>;
}

export { IUsersRepository };
