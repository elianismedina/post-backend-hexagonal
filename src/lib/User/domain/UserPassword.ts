import * as bcrypt from 'bcrypt';

export class UserPassword {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static async create(plainPassword: string): Promise<UserPassword> {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    return new UserPassword(hashedPassword);
  }

  public static fromHashed(value: string): UserPassword {
    return new UserPassword(value);
  }

  public async validatePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.value);
  }

  public getValue(): string {
    return this.value;
  }
}
