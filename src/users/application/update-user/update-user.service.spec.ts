import { Test } from '@nestjs/testing';
import { UpdateUserService } from './update-user.service';
import { UserDao } from '../../infrastructure/adapters/secondary/db/dao/user.dao';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from '../../infrastructure/adapters/secondary/db/user.repository';

describe('UpdateUserService', () => {
  let service: UpdateUserService;
  const mockRepository = {
    findById: jest.fn().mockImplementation((dao: Partial<UserDao>) => {
      return Promise.resolve({
        ...dao, // Spread the dao object first
        id: dao.id ?? Math.ceil(Math.random() * 10), // Explicitly set the id property if not already present
      });
    }),
    save: jest.fn().mockImplementation((dao: Partial<UserDao>) => {
      return Promise.resolve({
        ...dao, // Spread the dao object first
        id: dao.id ?? Math.ceil(Math.random() * 10), // Explicitly set the id property if not already present
      });
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [], // Add
      providers: [
        UpdateUserService,
        UserRepository,
        {
          provide: getRepositoryToken(UserDao),
          useValue: mockRepository,
        },
      ], // Add
    }).compile();

    service = moduleRef.get<UpdateUserService>(UpdateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
