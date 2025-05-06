import { UserEmail } from '../UserEmail';

describe('UserEmail', () => {
  it('should create a valid email', () => {
    const validEmail = 'test@example.com';
    const userEmail = new UserEmail(validEmail);
    expect(userEmail.getValue()).toBe(validEmail);
  });

  it('should throw error for invalid email format', () => {
    const invalidEmails = [
      'invalid-email',
      'missing@domain',
      '@missing-local.com',
      'spaces in@email.com',
      'special@chars!.com',
      '',
      '   ',
    ];

    invalidEmails.forEach((invalidEmail) => {
      expect(() => new UserEmail(invalidEmail)).toThrow('Invalid email format');
    });
  });

  it('should convert to string', () => {
    const email = 'test@example.com';
    const userEmail = new UserEmail(email);
    expect(userEmail.toString()).toBe(email);
  });

  it('should handle null or undefined values', () => {
    expect(() => new UserEmail(null as any)).toThrow('Email is required');
    expect(() => new UserEmail(undefined as any)).toThrow('Email is required');
  });

  it('should trim whitespace from email', () => {
    const email = '  test@example.com  ';
    const userEmail = new UserEmail(email);
    expect(userEmail.getValue()).toBe('test@example.com');
  });

  it('should handle case-insensitive email comparison', () => {
    const email1 = new UserEmail('Test@Example.com');
    const email2 = new UserEmail('test@example.com');
    expect(email1.getValue()).toBe(email2.getValue());
  });
});
