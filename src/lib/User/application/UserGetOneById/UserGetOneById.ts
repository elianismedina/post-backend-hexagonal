import { UserId } from '../../domain/UserId';
import { UserNotFoundError } from '../../domain/UserNotFoundError';
import { UserRepository } from '../../domain/UserRepository';

export class UserGetOneById {
  constructor(private repository: UserRepository) {}

  async run(id: string) {
    const userId = new UserId(id); // Validate the format of the ID
    const user = await this.repository.getOneById(userId);

    if (!user) {
      throw new UserNotFoundError('User not found');
    }

    return user;
  }
}
