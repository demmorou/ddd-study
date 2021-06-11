class Email {
  private readonly email: string;

  get value(): string {
    return this.email;
  }

  private constructor(email: string) {
    this.email = email;
  }

  static validate(email: string): boolean {
    if (!email || email.trim().length > 255) return false;

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      return false;
    }

    return true;
  }

  static format(email: string): string {
    const formattedEmail = email.trim().toLowerCase();

    return formattedEmail;
  }

  static create(email: string): Email | Error {
    if (!this.validate(email)) throw new Error('Invalid email');

    const formattedEmail = this.format(email);

    return new Email(formattedEmail);
  }
}

export { Email };
