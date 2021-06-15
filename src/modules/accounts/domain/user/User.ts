import { Entity } from '~core/domain/Entity';

import { Email, Name } from '.';

interface IUserProps {
  name: Name;
  email: Email;
}

class User extends Entity<IUserProps> {
  get email() {
    return this.props.email;
  }

  private constructor(props: IUserProps, id?: string) {
    super(props, id);
  }

  static create(props: IUserProps, id?: string): User {
    const user = new User(props, id);

    return user;
  }
}

export { User };
