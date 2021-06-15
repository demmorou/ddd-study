import { Email, Name, User } from '~modules/accounts/domain/user';
import { IUsersRepository } from '~modules/accounts/repositories/IUsersRepositories';

type IRegisterUserRequest = {
  email: string;
  name: string;
};

type IRegisterUserResponse = User;

class RegisterUser {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute({
    email,
    name,
  }: IRegisterUserRequest): Promise<IRegisterUserResponse> {
    const emailOrError = Email.create(email);
    const nameOrError = Name.create(name);

    if (emailOrError instanceof Error) {
      throw new Error('Invalid input email');
    }

    if (nameOrError instanceof Error) {
      throw new Error('Invalid input email');
    }

    const userOrError = User.create({
      email: emailOrError,
      name: nameOrError,
    });

    if (!userOrError) {
      throw new Error('Invalid user props');
    }

    const user = userOrError;

    const userAlredadyExists = await this.usersRepository.findByEmail(
      user.email.value,
    );

    if (userAlredadyExists) throw new Error('Account already exists');

    await this.usersRepository.create(user);

    return userOrError;
  }
}

export { RegisterUser };
