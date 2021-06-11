import { TypeormUser } from '~infra/database/typeorm/entities/TypeormUser';

import { Email } from '../domain/user/Email';
import { User } from '../domain/user/User';

class UserMapper {
  static toDomain(row: TypeormUser): User {
    const emailOrError = Email.create(row.email);

    if (emailOrError instanceof Error) {
      throw new Error('Invalid email');
    }

    const userOrError = User.create(
      {
        email: emailOrError,
      },
      row._id,
    );

    if (userOrError instanceof Error) throw new Error('Invalid props');

    return userOrError;
  }
}

export { UserMapper };
