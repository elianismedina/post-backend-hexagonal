import { UserGetOneById } from '../UserGetOneById/UserGetOneById';
import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
import { UserName } from '../../domain/UserName';
import { UserEmail } from '../../domain/UserEmail';
import { UserCreatedAt } from '../../domain/UserCreatedAt';
import { UserNotFoundError } from '../../domain/UserNotFoundError';

describe('UserGetOneById', () => {
  const mockRepository = {
    getOneById: jest.fn(),
  };

  const userGetOneById = new UserGetOneById(mockRepository as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return user when found', async () => {
    const userId = '5712345';
    const mockUser = new User(
      new UserId(userId),
      new UserName('John Doe'),
      new UserEmail('john.doe@example.com'),
      new UserCreatedAt(new Date()),
      'password123',
    );

    mockRepository.getOneById.mockResolvedValue(mockUser);

    const result = await userGetOneById.run(userId);

    expect(result).toBe(mockUser);
    expect(mockRepository.getOneById).toHaveBeenCalledWith(new UserId(userId));
  });

  it('should throw UserNotFoundError when user not found', async () => {
    const userId = '5712345';
    mockRepository.getOneById.mockResolvedValue(null);

    await expect(userGetOneById.run(userId)).rejects.toThrow(UserNotFoundError);

    expect(mockRepository.getOneById).toHaveBeenCalledWith(new UserId(userId));
  });

  it('should throw error for invalid ID format', async () => {
    const invalidIds = [
      '1234567', // Doesn't start with 57
      '571234', // Too short
      '57123456', // Too long
      'abc1234', // Contains letters
      '', // Empty string
    ];

    for (const invalidId of invalidIds) {
      await expect(userGetOneById.run(invalidId)).rejects.toThrow(
        'Invalid UserId format. It must be a 7-digit code starting with 57.',
      );
    }

    expect(mockRepository.getOneById).not.toHaveBeenCalled();
  });
});
