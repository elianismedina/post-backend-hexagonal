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
  role: string;

  constructor(
    id: UserId,
    name: UserName,
    email: UserEmail,
    createdAt: UserCreatedAt,
    password: string,
    role: string,
  ) {
    if (!id) throw new Error('User ID is required');
    if (!name) throw new Error('User name is required');
    if (!email) throw new Error('User email is required');
    if (!createdAt) throw new Error('User creation date is required');
    if (!password) throw new Error('User password is required');
    if (!role) throw new Error('User role is required');

    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.password = password;
    this.role = role;
  }

  public nameAndEmail() {
    return `${this.name.toString()} - ${this.email.toString()}`;
  }

  public toPlainObject(): {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    role: string;
  } {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      email: this.email.getValue(),
      createdAt: this.createdAt.getValue(),
      role: this.role,
    };
  }
}
