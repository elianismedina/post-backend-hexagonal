import { Test } from '@nestjs/testing';
import { FindUserByIdService } from './find-user-by-id.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDao } from '../../infrastructure/adapters/secondary/db/dao/user.dao';
import { UserRepository } from '../../infrastructure/adapters/secondary/db/user.repository';

describe('FindUserByIdService', () => {
  let service: FindUserByIdService;
  const mockRepository = {
    findById: jest.fn().mockImplementation((dao: Partial<UserDao>) => {
      return Promise.resolve({
        ...dao, // Spread the dao object first
        id: Math.ceil(Math.random() * 10), // Explicitly set the id property
      });
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [], // Add
      providers: [
        FindUserByIdService,
        UserRepository,
        {
          provide: getRepositoryToken(UserDao),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          useValue: mockRepository.findById(),
        },
      ], // Add
    }).compile();

    service = moduleRef.get<FindUserByIdService>(FindUserByIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
