export class UserName {
  private readonly value: string;

  constructor(value: string) {
    if (value === null || value === undefined) {
      throw new Error('Name is required');
    }

    const trimmedValue = value.trim();
    if (!trimmedValue) {
      throw new Error('Invalid name format');
    }

    if (trimmedValue.length < 2) {
      throw new Error('Invalid name format');
    }

    if (trimmedValue.length > 50) {
      throw new Error('Invalid name format');
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmedValue)) {
      throw new Error('Invalid name format');
    }

    // Replace multiple spaces with a single space
    this.value = trimmedValue.replace(/\s+/g, ' ');
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }
}
