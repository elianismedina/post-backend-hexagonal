import { User } from '../../domain/User';
import { UserCreatedAt } from '../../domain/UserCreatedAt';
import { UserEmail } from '../../domain/UserEmail';
import { UserId } from '../../domain/UserId';
import { UserName } from '../../domain/UserName';
import { UserRepository } from '../../domain/UserRepository';

export class UserEdit {
  constructor(private repository: UserRepository) {}

  async run(
    id: string,
    name: string,
    email: string,
    createdAt: Date,
  ): Promise<void> {
    const existingUser = await this.repository.getOneById(new UserId(id));
    if (!existingUser) {
      throw new Error('User not found');
    }

    const user = new User(
      new UserId(id),
      new UserName(name),
      new UserEmail(email),
      new UserCreatedAt(createdAt),
      existingUser.password, // Use the existing password
    );

    return this.repository.edit(user);
  }
}
