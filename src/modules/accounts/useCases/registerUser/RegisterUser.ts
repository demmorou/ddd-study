import { Email } from '~modules/accounts/domain/user/Email';
import { User } from '~modules/accounts/domain/user/User';
import { IUsersRepository } from '~modules/accounts/repositories/IUsersRepositories';

type IRegisterUserRequest = {
  email: string;
};

type IRegisterUserResponse = User;

class RegisterUser {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute({
    email,
  }: IRegisterUserRequest): Promise<IRegisterUserResponse> {
    const emailOrError = Email.create(email);

    if (emailOrError instanceof Error) {
      throw new Error('Invalid input email');
    }

    const userOrError = User.create({
      email: emailOrError,
    });

    if (!userOrError) {
      throw new Error('Invalid user props');
    }

    const user = userOrError;

    await this.usersRepository.create(user);

    return userOrError;
  }
}

export { RegisterUser };
