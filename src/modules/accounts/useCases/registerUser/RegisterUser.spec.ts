import { MemoryUsersRepository } from '~modules/accounts/repositories/memory/MemoryUsersRepository';

import { RegisterUser } from './RegisterUser';

describe('Register User', () => {
  let usersRepository: MemoryUsersRepository;
  let registerUser: RegisterUser;

  beforeEach(() => {
    usersRepository = new MemoryUsersRepository();
    registerUser = new RegisterUser(usersRepository);
  });

  it('Should be able register a new user', async () => {
    const response = await registerUser.execute({
      email: 'deusimar@dev.com.br',
    });

    expect(response.props).toBeTruthy();
  });
});
