import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDao } from '../../infrastructure/adapters/secondary/db/dao/user.dao';
import { FindUsersService } from './find-users.service';
import { UserRepository } from '../../infrastructure/adapters/secondary/db/user.repository';

describe('FindUsersService', () => {
  let service: FindUsersService;
  const mockRepository = {
    find: jest.fn().mockImplementation((dao: Partial<UserDao>) => {
      return Promise.resolve([
        {
          ...dao, // Spread the dao object first
          id: Math.ceil(Math.random() * 10), // Explicitly set the id property
        },
        {
          ...dao, // Spread the dao object first
          id: Math.ceil(Math.random() * 10), // Explicitly set the id property
        },
      ]);
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [], // Add
      providers: [
        FindUsersService,
        UserRepository,
        {
          provide: getRepositoryToken(UserDao),
          useValue: mockRepository,
        },
      ], // Add
    }).compile();

    service = moduleRef.get<FindUsersService>(FindUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
