import { UserRepository } from './UserRepository';

export class UserId {
  private readonly value: string;

  constructor(value: string) {
    if (!/^57\d{5}$/.test(value)) {
      throw new Error(
        'Invalid UserId format. It must be a 7-digit code starting with 57.',
      );
    }
    this.value = value;
  }

  public static async generate(repository: UserRepository): Promise<UserId> {
    let unique = false;
    let newId: string = '';

    while (!unique) {
      const randomPart = Math.floor(10000 + Math.random() * 90000);
      newId = `57${randomPart}`;
      const existingUser = await repository.getOneById(new UserId(newId));
      if (!existingUser) {
        unique = true;
      }
    }

    return new UserId(newId);
  }

  public getValue(): string {
    return this.value;
  }
}
