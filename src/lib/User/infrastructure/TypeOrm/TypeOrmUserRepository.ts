import { Repository } from 'typeorm';
import { UserRepository } from './../../domain/UserRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmUserEntity } from './TypeOrmUserEntity';
import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
import { UserName } from '../../domain/UserName';
import { UserEmail } from '../../domain/UserEmail';
import { UserCreatedAt } from '../../domain/UserCreatedAt';

export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(TypeOrmUserEntity)
    private readonly repository: Repository<TypeOrmUserEntity>,
  ) {}

  private mapToDomain(u: TypeOrmUserEntity) {
    return new User(
      new UserId(u.id),
      new UserName(u.name),
      new UserEmail(u.email),
      new UserCreatedAt(u.createdAt),
    );
  }

  async getAll(): Promise<User[]> {
    const users = await this.repository.find();

    return users.map((u) => this.mapToDomain(u));
  }

  async getOneById(id: UserId): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        id: id.getValue(), // Use the getter method here
      },
    });

    if (!user) return null;

    return this.mapToDomain(user);
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
