import { UserLogin } from '../UserLogin/UserLogin';
import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
import { UserName } from '../../domain/UserName';
import { UserEmail } from '../../domain/UserEmail';
import { UserCreatedAt } from '../../domain/UserCreatedAt';

describe('UserLogin', () => {
  const mockRepository = {
    getOneByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  const userLogin = new UserLogin(mockRepository as any, mockJwtService as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login successfully with valid credentials', async () => {
    const email = 'john.doe@example.com';
    const password = 'password123';
    const mockUser = new User(
      new UserId('5712345'),
      new UserName('John Doe'),
      new UserEmail(email),
      new UserCreatedAt(new Date()),
      'hashedPassword123',
      'cashier', // Add role
    );

    const mockToken = 'mock.jwt.token';
    mockRepository.getOneByEmail.mockResolvedValue(mockUser);
    mockJwtService.sign.mockReturnValue(mockToken);

    const result = await userLogin.run(email, password);

    expect(result).toEqual({
      accessToken: mockToken,
      user: mockUser.toPlainObject(),
    });
    expect(mockRepository.getOneByEmail).toHaveBeenCalledWith(
      new UserEmail(email),
    );
    expect(mockJwtService.sign).toHaveBeenCalled();
  });

  it('should throw error when user not found', async () => {
    const email = 'nonexistent@example.com';
    const password = 'password123';

    mockRepository.getOneByEmail.mockResolvedValue(null);

    await expect(userLogin.run(email, password)).rejects.toThrow(
      'Invalid credentials',
    );

    expect(mockRepository.getOneByEmail).toHaveBeenCalledWith(
      new UserEmail(email),
    );
    expect(mockJwtService.sign).not.toHaveBeenCalled();
  });

  it('should throw error when password is incorrect', async () => {
    const email = 'john.doe@example.com';
    const wrongPassword = 'wrongpassword';
    const mockUser = new User(
      new UserId('5712345'),
      new UserName('John Doe'),
      new UserEmail(email),
      new UserCreatedAt(new Date()),
      'correctpassword',
      'cashier', // Add role
    );

    mockRepository.getOneByEmail.mockResolvedValue(mockUser);

    await expect(userLogin.run(email, wrongPassword)).rejects.toThrow(
      'Invalid credentials',
    );

    expect(mockRepository.getOneByEmail).toHaveBeenCalledWith(
      new UserEmail(email),
    );
    expect(mockJwtService.sign).not.toHaveBeenCalled();
  });

  it('should throw error for invalid email format', async () => {
    const invalidEmails = [
      'invalid-email',
      '@example.com',
      'user@',
      'user@.com',
      'user@example',
      '',
      'user space@example.com',
    ];

    for (const invalidEmail of invalidEmails) {
      await expect(
        userLogin.run(invalidEmail, 'password123'),
      ).rejects.toThrow();
    }

    expect(mockRepository.getOneByEmail).not.toHaveBeenCalled();
    expect(mockJwtService.sign).not.toHaveBeenCalled();
  });
});
