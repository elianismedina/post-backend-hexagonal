import { UserName } from '../UserName';

describe('UserName', () => {
  it('should create a valid name', () => {
    const validName = 'John Doe';
    const userName = new UserName(validName);
    expect(userName.getValue()).toBe(validName);
  });

  it('should throw error for invalid name format', () => {
    const invalidNames = [
      '', // Empty string
      '   ', // Only whitespace
      'A', // Too short
      'a'.repeat(51), // Too long
      'John123', // Contains numbers
      'John@Doe', // Contains special characters
    ];

    invalidNames.forEach((invalidName) => {
      expect(() => new UserName(invalidName)).toThrow('Invalid name format');
    });
  });

  it('should convert to string', () => {
    const name = 'John Doe';
    const userName = new UserName(name);
    expect(userName.toString()).toBe(name);
  });

  it('should handle null or undefined values', () => {
    expect(() => new UserName(null as any)).toThrow('Name is required');
    expect(() => new UserName(undefined as any)).toThrow('Name is required');
  });

  it('should trim whitespace from name', () => {
    const name = '  John Doe  ';
    const userName = new UserName(name);
    expect(userName.getValue()).toBe('John Doe');
  });

  it('should handle names with multiple spaces', () => {
    const name = 'John   Doe';
    const userName = new UserName(name);
    expect(userName.getValue()).toBe('John Doe');
  });

  it('should handle names with accents and special characters', () => {
    const name = 'José María García';
    const userName = new UserName(name);
    expect(userName.getValue()).toBe('José María García');
  });
});
