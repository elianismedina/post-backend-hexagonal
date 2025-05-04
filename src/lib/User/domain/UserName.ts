export class UserName {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }
}
