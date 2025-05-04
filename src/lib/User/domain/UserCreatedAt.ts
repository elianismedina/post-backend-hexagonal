export class UserCreatedAt {
  private readonly value: Date;

  constructor(value: Date) {
    this.value = value;
  }

  public getValue(): Date {
    return this.value;
  }
}
