class Name {
  private readonly name: string;

  get value(): string {
    return this.name;
  }

  private constructor(name: string) {
    this.name = name;
  }

  static validate(name: string): boolean {
    if (!name || name.trim().length < 2 || name.trim().length > 255)
      return false;

    const nameFormat = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

    if (nameFormat.test(name)) return false;

    return true;
  }

  static create(name: string): Name {
    if (!this.validate(name)) throw new Error('Invalid name input');

    return new Name(name);
  }
}

export { Name };
