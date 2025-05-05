import { User } from './User';
import { UserId } from './UserId';
import { UserEmail } from './UserEmail';

export interface UserRepository {
  create(user: User, hashedPassword: string): Promise<void>;
  getAll(): Promise<User[]>;
  getOneById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  edit(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
}
