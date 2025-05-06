import { UserCreate } from '../UserCreate/UserCreate';
import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
import { UserName } from '../../domain/UserName';
import { UserEmail } from '../../domain/UserEmail';
import { UserCreatedAt } from '../../domain/UserCreatedAt';

describe('UserCreate', () => {
  const mockRepository = {
    save: jest.fn(),
    getOneByEmail: jest.fn(),
  };

  const userCreate = new UserCreate(mockRepository as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user successfully', async () => {
    const name = 'John Doe';
    const email = 'john.doe@example.com';
    const password = 'password123';
    const createdAt = new Date();

    const mockUser = new User(
      new UserId('5712345'),
      new UserName(name),
      new UserEmail(email),
      new UserCreatedAt(createdAt),
      password,
    );

    mockRepository.getOneByEmail.mockResolvedValue(null);
    mockRepository.save.mockResolvedValue(mockUser);

    const result = await userCreate.run(name, email, password, createdAt);

    expect(result).toBe(mockUser);
    expect(mockRepository.getOneByEmail).toHaveBeenCalledWith(
      new UserEmail(email),
    );
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should throw error if email already exists', async () => {
    const name = 'John Doe';
    const email = 'john.doe@example.com';
    const password = 'password123';
    const createdAt = new Date();

    const existingUser = new User(
      new UserId('5712345'),
      new UserName('Existing User'),
      new UserEmail(email),
      new UserCreatedAt(createdAt),
      password,
    );

    mockRepository.getOneByEmail.mockResolvedValue(existingUser);

    await expect(
      userCreate.run(name, email, password, createdAt),
    ).rejects.toThrow('User with this email already exists');

    expect(mockRepository.getOneByEmail).toHaveBeenCalledWith(
      new UserEmail(email),
    );
    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it('should throw error for invalid input data', async () => {
    const invalidInputs = [
      { name: '', email: 'valid@email.com', password: 'password123' },
      { name: 'John Doe', email: 'invalid-email', password: 'password123' },
      { name: 'John Doe', email: 'valid@email.com', password: '' },
    ];

    for (const input of invalidInputs) {
      await expect(
        userCreate.run(input.name, input.email, input.password, new Date()),
      ).rejects.toThrow();
    }

    expect(mockRepository.getOneByEmail).not.toHaveBeenCalled();
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
});
