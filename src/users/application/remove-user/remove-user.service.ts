import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDao } from '../../infrastructure/adapters/secondary/db/dao/user.dao';
import { UserRepository } from '../../infrastructure/adapters/secondary/db/user.repository';

@Injectable()
export class RemoveUserService {
  constructor(private userRepository: UserRepository) {}

  async remove(id: number): Promise<UserDao> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return this.userRepository.remove(user); // TypeScript now knows `user` is not null
  }
}
