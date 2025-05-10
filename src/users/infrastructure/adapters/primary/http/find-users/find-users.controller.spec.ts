import { Test, TestingModule } from '@nestjs/testing';
import { FindUsersController } from './find-users.controller';
import { UserDao } from '../../../../../infrastructure/adapters/secondary/db/dao/user.dao';
import { FindUsersService } from '../../../../../application/find-users/find-users.service';

describe('FindUsersController', () => {
  let controller: FindUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindUsersController],
      providers: [
        {
          provide: FindUsersService,
          useValue: {
            // eslint-disable-next-line @typescript-eslint/require-await
            find: async () =>
              [{ id: 1, email: 'test@gmail.com', name: 'Test' }] as UserDao[],
          },
        },
      ],
    }).compile();

    controller = module.get<FindUsersController>(FindUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all users', async () => {
    const users = await controller.find();
    expect(users.length).toBe(1);
  });
});
