import { Test } from '@nestjs/testing';
import { SignInService } from './signin.service';
import { JwtFacadeService } from '../jwt-facade/jwt.facade.service';
import { UserDao } from '../../../auth/infrastructure/adapters/secondary/db/dao/user.dao';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthRepository } from '../../../auth/infrastructure/adapters/secondary/db/user.repository';
import { EncryptionFacadeService } from '../encryption-facade/encryption.facade.service';
import { ValidateUserService } from '../validate-user/validate-user.service';

describe('SignInService', () => {
  let service: SignInService;

  const mockRepository = {
    findOneBy: jest.fn().mockImplementation((dao: UserDao) => {
      return Promise.resolve({
        ...dao,
        id: dao.id ?? Math.ceil(Math.random() * 10), // Avoid overwriting `id`
      });
    }),
    save: jest.fn().mockImplementation((dao: UserDao) => {
      return Promise.resolve({
        ...dao,
        id: dao.id ?? Math.ceil(Math.random() * 10), // Avoid overwriting `id`
      });
    }),
  };

  const mockJwtFacadeService: Partial<JwtFacadeService> = {
    createJwtAndRefreshToken: jest.fn(async () => ({
      token: 'token',
      refreshToken: 'refreshToken',
    })),
  };

  const mockEncryptionFacadeService: Partial<EncryptionFacadeService> = {
    compare: jest.fn(async () => true), // Return a Promise<boolean>
  };

  const mockValidateUserService: Partial<ValidateUserService> = {
    validate: jest.fn(async () => ({
      id: 1, // Ensure `id` is a number
      email: 'test@gmail.com',
      name: 'Test User', // Provide a valid `name`
      isAdmin: false,
      password: 'hashedPassword', // Add required property
      refreshToken: 'refreshToken', // Add required property
      createdAt: new Date(), // Add required property
    })),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        SignInService,
        { provide: AuthRepository, useValue: mockRepository },
        {
          provide: EncryptionFacadeService,
          useValue: mockEncryptionFacadeService, // Use the updated mock
        },
        {
          provide: ValidateUserService,
          useValue: mockValidateUserService, // Use the updated mock
        },
        { provide: getRepositoryToken(UserDao), useValue: mockRepository },
        { provide: JwtFacadeService, useValue: mockJwtFacadeService },
      ],
    }).compile();

    service = moduleRef.get<SignInService>(SignInService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return token', async () => {
    const result = await service.signin('test@gmail.com', 'test');
    expect(result).toStrictEqual({
      token: 'token',
      refreshToken: 'refreshToken',
    });
  });
});
//
