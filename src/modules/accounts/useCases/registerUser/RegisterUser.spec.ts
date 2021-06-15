import { Email, Name, User } from '~modules/accounts/domain/user';
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
    const email = Email.create('deusimar@dev.com.br') as Email;
    const name = Name.create('deusimar') as Name;

    const response = await registerUser.execute({
      email: email.value,
      name: name.value,
    });

    expect(response.props).toBeTruthy();
  });

  it('should not be able register a new user with an email already existent', async () => {
    const email = Email.create('deusimar@dev.com.br') as Email;
    const name = Name.create('deusimar') as Name;

    const user = User.create({ email, name });

    await usersRepository.create(user);

    await expect(
      registerUser.execute({
        email: 'deusimar@dev.com.br',
        name: name.value,
      }),
    ).rejects.toHaveProperty('message', 'Account already exists');
  });
});
