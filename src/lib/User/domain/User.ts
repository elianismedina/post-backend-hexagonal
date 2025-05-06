import { UserCreatedAt } from './UserCreatedAt';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserName } from './UserName';

export class User {
  id: UserId;
  name: UserName;
  email: UserEmail;
  createdAt: UserCreatedAt;
  password: string;

  constructor(
    id: UserId,
    name: UserName,
    email: UserEmail,
    createdAt: UserCreatedAt,
    password: string,
  ) {
    if (!id) {
      throw new Error('User ID is required');
    }
    if (!name) {
      throw new Error('User name is required');
    }
    if (!email) {
      throw new Error('User email is required');
    }
    if (!createdAt) {
      throw new Error('User creation date is required');
    }
    if (!password) {
      throw new Error('User password is required');
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.password = password;
  }

  public nameAndEmail() {
    return `${this.name.toString()} - ${this.email.toString()}`;
  }

  public toPlainObject(): {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  } {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      email: this.email.getValue(),
      createdAt: this.createdAt.getValue(),
    };
  }
}
