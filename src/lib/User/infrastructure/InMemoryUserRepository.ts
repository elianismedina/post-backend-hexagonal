import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserRepository } from '../domain/UserRepository';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  // eslint-disable-next-line @typescript-eslint/require-await
  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async getAll(): Promise<User[]> {
    return this.users;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async getOneById(id: UserId): Promise<User | null> {
    return (
      this.users.find((user) => user.id.getValue() === id.getValue()) || null
    );
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async edit(user: User): Promise<void> {
    const index = this.users.findIndex(
      (u) => u.id.getValue() === user.id.getValue(),
    );
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users[index] = user;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async delete(id: UserId): Promise<void> {
    this.users = this.users.filter(
      (user) => user.id.getValue() !== id.getValue(),
    );
  }
}
