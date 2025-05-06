export class UserEmail {
  private readonly value: string;

  constructor(value: string) {
    if (value === null || value === undefined) {
      throw new Error('Email is required');
    }

    const trimmedValue = value.trim();
    if (!trimmedValue) {
      throw new Error('Invalid email format');
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedValue)) {
      throw new Error('Invalid email format');
    }

    this.value = trimmedValue.toLowerCase();
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }
}
