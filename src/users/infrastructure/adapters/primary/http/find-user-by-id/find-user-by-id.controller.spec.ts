import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByIdService } from '../../../../../application/find-user-by-id/find-user-by-id.service';
import { UserDao } from '../../../../adapters/secondary/db/dao/user.dao';
import { FindUserByIdController } from './find-user-by-id.controller';

describe('UsersController', () => {
  let controller: FindUserByIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindUserByIdController],
      providers: [
        {
          provide: FindUserByIdService,
          useValue: {
            // eslint-disable-next-line @typescript-eslint/require-await
            find: async () =>
              ({ id: 1, email: 'test@gmail.com', name: 'Test' }) as UserDao,
          },
        },
      ],
    }).compile();

    controller = module.get<FindUserByIdController>(FindUserByIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find the user by id', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await controller.findUserById('1');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(user.id).toBe(1);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(user.email).toBe('test@gmail.com');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(user.name).toBe('Test');
  });
});
