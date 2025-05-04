import { User } from '../../domain/User';
import { UserCreatedAt } from '../../domain/UserCreatedAt';
import { UserEmail } from '../../domain/UserEmail';
import { UserId } from '../../domain/UserId';
import { UserName } from '../../domain/UserName';
import { UserRepository } from '../../domain/UserRepository';

export class UserCreate {
  constructor(private repository: UserRepository) {}

  async run(name: string, email: string, createdAt: Date): Promise<void> {
    const user = new User(
      UserId.generate(), // Automatically generate the user ID
      new UserName(name),
      new UserEmail(email),
      new UserCreatedAt(createdAt),
    );

    return this.repository.create(user);
  }
}
