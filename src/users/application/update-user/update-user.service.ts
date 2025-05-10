import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDao } from '../../infrastructure/adapters/secondary/db/dao/user.dao';
import { UserRepository } from '../../infrastructure/adapters/secondary/db/user.repository';

@Injectable()
export class UpdateUserService {
  constructor(private userRepository: UserRepository) {}

  async update(id: number, attrs: Partial<UserDao>) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    Object.assign(user, attrs); // Assign the attributes in `attrs` to `user`

    return this.userRepository.save(user); // Save the updated user
  }
}
