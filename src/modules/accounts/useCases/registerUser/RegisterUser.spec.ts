import { Email } from '~modules/accounts/domain/user/Email';
import { User } from '~modules/accounts/domain/user/User';
import { MemoryUsersRepository } from '~modules/accounts/repositories/memory/MemoryUsersRepository';

import { RegisterUser } from './RegisterUser';

describe('Register User', () => {
  let usersRepository: MemoryUsersRepository;
  let registerUser: RegisterUser;

  beforeEach(() => {
    usersRepository = new MemoryUsersRepository();
    registerUser = new RegisterUser(usersRepository);
  });

  it('should be able register a new user', async () => {
    const response = await registerUser.execute({
      email: 'deusimar@dev.com.br',
    });

    expect(response.props).toBeTruthy();
  });

  it('should not be able register a new user with an email already existent', async () => {
    const email = Email.create('deusimar@dev.com.br') as Email;

    const user = User.create({ email });

    await usersRepository.create(user);

    await expect(
      registerUser.execute({
        email: 'deusimar@dev.com.br',
      }),
    ).rejects.toHaveProperty('message', 'Account already exists');
  });
});
