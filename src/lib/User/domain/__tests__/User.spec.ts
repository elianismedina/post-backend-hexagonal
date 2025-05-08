import { User } from '../User';
import { UserId } from '../UserId';
import { UserName } from '../UserName';
import { UserEmail } from '../UserEmail';
import { UserCreatedAt } from '../UserCreatedAt';

describe('User', () => {
  const validId = '5712345';
  const validName = 'John Doe';
  const validEmail = 'john.doe@example.com';
  const validPassword = 'password123';
  const validCreatedAt = new Date();
  const validRole = 'admin'; // Add a valid role

  it('should create a valid user', () => {
    const user = new User(
      new UserId(validId),
      new UserName(validName),
      new UserEmail(validEmail),
      new UserCreatedAt(validCreatedAt),
      validPassword,
      validRole, // Pass the role
    );

    expect(user.id.getValue()).toBe(validId);
    expect(user.name.getValue()).toBe(validName);
    expect(user.email.getValue()).toBe(validEmail);
    expect(user.password).toBe(validPassword);
    expect(user.createdAt.getValue()).toBe(validCreatedAt);
    expect(user.role).toBe(validRole); // Check the role
  });

  it('should convert user to plain object', () => {
    const user = new User(
      new UserId(validId),
      new UserName(validName),
      new UserEmail(validEmail),
      new UserCreatedAt(validCreatedAt),
      validPassword,
      validRole, // Pass the role
    );

    const plainObject = user.toPlainObject();

    expect(plainObject).toEqual({
      id: validId,
      name: validName,
      email: validEmail,
      createdAt: validCreatedAt,
      role: validRole, // Include the role in the plain object
    });
  });

  it('should return name and email in correct format', () => {
    const user = new User(
      new UserId(validId),
      new UserName(validName),
      new UserEmail(validEmail),
      new UserCreatedAt(validCreatedAt),
      validPassword,
      validRole, // Pass the role
    );

    expect(user.nameAndEmail()).toBe(`${validName} - ${validEmail}`);
  });

  it('should throw error when required fields are missing', () => {
    expect(
      () =>
        new User(
          null as any,
          new UserName(validName),
          new UserEmail(validEmail),
          new UserCreatedAt(validCreatedAt),
          validPassword,
          validRole, // Pass the role
        ),
    ).toThrow();

    expect(
      () =>
        new User(
          new UserId(validId),
          null as any,
          new UserEmail(validEmail),
          new UserCreatedAt(validCreatedAt),
          validPassword,
          validRole, // Pass the role
        ),
    ).toThrow();

    expect(
      () =>
        new User(
          new UserId(validId),
          new UserName(validName),
          null as any,
          new UserCreatedAt(validCreatedAt),
          validPassword,
          validRole, // Pass the role
        ),
    ).toThrow();

    expect(
      () =>
        new User(
          new UserId(validId),
          new UserName(validName),
          new UserEmail(validEmail),
          null as any,
          validPassword,
          validRole, // Pass the role
        ),
    ).toThrow();
  });
});
