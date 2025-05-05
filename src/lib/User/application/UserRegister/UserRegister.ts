import { User } from '../../domain/User';
import { UserCreatedAt } from '../../domain/UserCreatedAt';
import { UserEmail } from '../../domain/UserEmail';
import { UserId } from '../../domain/UserId';
import { UserName } from '../../domain/UserName';
import { UserPassword } from '../../domain/UserPassword';
import { UserRepository } from '../../domain/UserRepository';

export class UserRegister {
  constructor(private repository: UserRepository) {}

  async run(
    name: string,
    email: string,
    plainPassword: string,
    createdAt: Date, // Add createdAt as the fourth argument
  ): Promise<void> {
    const userId = await UserId.generate(this.repository);
    const hashedPassword = await UserPassword.create(plainPassword);

    const user = new User(
      userId,
      new UserName(name),
      new UserEmail(email),
      new UserCreatedAt(createdAt),
      hashedPassword.getValue(), // Pass the hashed password
    );

    await this.repository.create(user, hashedPassword.getValue());
  }
}
