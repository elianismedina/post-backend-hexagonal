import { Test, TestingModule } from '@nestjs/testing';
import { RemoveUserController } from './remove-user.controller';
import { UserDao } from '../../../secondary/db/dao/user.dao';
import { RemoveUserService } from '../../../../../application/remove-user/remove-user.service';

describe('RemoveUserController', () => {
  let controller: RemoveUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemoveUserController],
      providers: [
        {
          provide: RemoveUserService,
          useValue: {
            // eslint-disable-next-line @typescript-eslint/require-await
            remove: async () =>
              ({ id: 1, email: 'test@gmail.com', name: 'Test' }) as UserDao,
          },
        },
      ],
    }).compile();

    controller = module.get<RemoveUserController>(RemoveUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should remove an user', async () => {
    const user = await controller.remove('1');
    expect(user.email).toBe('test@gmail.com');
  });
});
