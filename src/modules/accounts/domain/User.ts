import { Entity } from '~core/domain/Entity';

import { Email } from './Email';

interface IUserProps {
  email: Email;
}

class User extends Entity<IUserProps> {
  get email() {
    return this.props.email;
  }

  private constructor(props: IUserProps, id?: string) {
    super(props, id);
  }

  static create(props: IUserProps, id?: string): Error | User {
    const user = new User(props, id);

    return user;
  }
}

export { User };
