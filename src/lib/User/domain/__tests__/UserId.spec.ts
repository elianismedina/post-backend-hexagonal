import { UserId } from '../UserId';

describe('UserId', () => {
  it('should create a valid user ID', () => {
    const validId = '5712345';
    const userId = new UserId(validId);
    expect(userId.getValue()).toBe(validId);
  });

  it('should throw error for invalid ID format', () => {
    const invalidIds = [
      '1234567', // Doesn't start with 57
      '571234', // Too short
      '57123456', // Too long
      'abc1234', // Contains letters
      '', // Empty string
    ];

    invalidIds.forEach((invalidId) => {
      expect(() => new UserId(invalidId)).toThrow(
        'Invalid UserId format. It must be a 7-digit code starting with 57.',
      );
    });
  });

  it('should generate a valid ID', async () => {
    const mockRepository = {
      getOneById: jest.fn().mockResolvedValue(null),
    };

    const userId = await UserId.generate(mockRepository as any);
    expect(userId.getValue()).toMatch(/^57\d{5}$/);
  });

  it('should generate a unique ID', async () => {
    const mockRepository = {
      getOneById: jest
        .fn()
        .mockResolvedValueOnce({}) // First call returns existing user
        .mockResolvedValueOnce(null), // Second call returns null (unique ID)
    };

    const userId = await UserId.generate(mockRepository as any);
    expect(userId.getValue()).toMatch(/^57\d{5}$/);
    expect(mockRepository.getOneById).toHaveBeenCalledTimes(2);
  });

  it('should handle repository errors during ID generation', async () => {
    const mockRepository = {
      getOneById: jest.fn().mockRejectedValue(new Error('Database error')),
    };

    await expect(UserId.generate(mockRepository as any)).rejects.toThrow(
      'Database error',
    );
  });
});
