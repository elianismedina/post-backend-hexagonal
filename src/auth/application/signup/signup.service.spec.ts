import { Test } from '@nestjs/testing';
import { SignUpService } from './signup.service';
import { EncryptionFacadeService } from '../encryption-facade/encryption.facade.service';
import { CreateUserService } from '../create-user/create-user.service';
import { AuthRepository } from '../../../auth/infrastructure/adapters/secondary/db/user.repository';

describe('SignUpService', () => {
  let service: SignUpService;

  const mockEncryptionFacadeService = {
    hash: jest.fn(async () => 'hashedPassword'),
  };

  const mockCreateUserService = {
    create: jest.fn((email: string, password: string) => ({
      email,
      password,
      isAdmin: false,
    })),
  };

  const mockAuthRepository = {
    findByEmail: jest.fn(async () => null),
    create: jest.fn((user) => user),
    save: jest.fn(async (user) => user),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SignUpService,
        {
          provide: EncryptionFacadeService,
          useValue: mockEncryptionFacadeService,
        },
        { provide: CreateUserService, useValue: mockCreateUserService },
        { provide: AuthRepository, useValue: mockAuthRepository },
      ],
    }).compile();

    service = moduleRef.get<SignUpService>(SignUpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
