import { EmailValueObject } from '../../../shared/domain/value-objects/email.value.object';

export class User {
  constructor(
    private email: EmailValueObject,
    private name: string,
  ) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async toJSON() {
    return {
      email: this.email.getValue,
      name: this.name,
    };
  }
}
