import { TypeormUser } from '~infra/database/typeorm/entities/TypeormUser';

import { Email, Name, User } from '../domain/user';

class UserMapper {
  static toDomain(row: TypeormUser): User {
    const emailOrError = Email.create(row.email);
    const nameOrError = Name.create(row.name);

    if (emailOrError instanceof Error) {
      throw new Error('Invalid email');
    }

    if (nameOrError instanceof Error) {
      throw new Error('Invalid name');
    }

    const userOrError = User.create(
      {
        email: emailOrError,
        name: nameOrError,
      },
      row._id,
    );

    if (userOrError instanceof Error) throw new Error('Invalid props');

    return userOrError;
  }
}

export { UserMapper };
