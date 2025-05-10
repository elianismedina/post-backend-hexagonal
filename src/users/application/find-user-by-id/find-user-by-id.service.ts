import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserDao } from '../../infrastructure/adapters/secondary/db/dao/user.dao';
import { UserRepository } from '../../infrastructure/adapters/secondary/db/user.repository';

@Injectable()
export class FindUserByIdService {
  constructor(private userRepository: UserRepository) {}

  async find(id: number): Promise<UserDao> {
    if (!id) {
      throw new BadRequestException('Invalid user ID'); // Throw an error for invalid `id`
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found!'); // Throw an error if user is not found
    }

    return user; // TypeScript now knows `user` is not null
  }
}
