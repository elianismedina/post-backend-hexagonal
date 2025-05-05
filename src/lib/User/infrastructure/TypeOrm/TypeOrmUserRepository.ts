import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../domain/UserRepository';
import { User } from '../../domain/User';
import { TypeOrmUserEntity } from './TypeOrmUserEntity';
import { UserId } from '../../domain/UserId';
import { UserName } from '../../domain/UserName';
import { UserEmail } from '../../domain/UserEmail';
import { UserCreatedAt } from '../../domain/UserCreatedAt';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(TypeOrmUserEntity)
    private readonly repository: Repository<TypeOrmUserEntity>,
  ) {}

  async getAll(): Promise<User[]> {
    const entities = await this.repository.find();
    return entities.map(
      (u) =>
        new User(
          new UserId(u.id),
          new UserName(u.name),
          new UserEmail(u.email),
          new UserCreatedAt(u.createdAt),
        ),
    );
  }

  async getOneById(id: UserId): Promise<User | null> {
    const entity = await this.repository.findOne({
      where: { id: id.getValue() },
    });
    if (!entity) return null;

    return new User(
      new UserId(entity.id),
      new UserName(entity.name),
      new UserEmail(entity.email),
      new UserCreatedAt(entity.createdAt),
    );
  }

  async create(user: User): Promise<void> {
    await this.repository.save({
      id: user.id.getValue(),
      name: user.name.getValue(),
      email: user.email.getValue(),
      createdAt: user.createdAt.getValue(),
    });
  }

  async edit(user: User): Promise<void> {
    await this.repository.update(user.id.getValue(), {
      name: user.name.getValue(),
      email: user.email.getValue(),
      createdAt: user.createdAt.getValue(),
    });
  }

  async delete(id: UserId): Promise<void> {
    await this.repository.delete(id.getValue());
  }
}
