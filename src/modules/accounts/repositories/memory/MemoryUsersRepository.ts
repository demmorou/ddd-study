import { User } from '~modules/accounts/domain/user/User';

import { IUsersRepository } from '../IUsersRepositories';

class MemoryUsersRepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public async create(user: User): Promise<void> {
    this.users.push(user);
  }

  public async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex(({ id }) => user.id === id);

    this.users[userIndex] = user;
  }
}

export { MemoryUsersRepository };
