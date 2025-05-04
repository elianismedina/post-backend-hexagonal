export class UserId {
  private readonly value: string;

  constructor(value: string) {
    if (!/57\d{5}/.test(value)) {
      throw new Error(
        'Invalid UserId format. It must be a 7-digit code starting with 57.',
      );
    }
    this.value = value;
  }

  public static generate(): UserId {
    const randomPart = Math.floor(10000 + Math.random() * 90000); // Generate a 5-digit random number
    return new UserId(`57${randomPart}`);
  }

  public getValue(): string {
    return this.value;
  }
}
