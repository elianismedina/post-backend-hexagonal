import { UserRepository } from '../../domain/UserRepository';
import { UserEmail } from '../../domain/UserEmail';
import { UserPassword } from '../../domain/UserPassword';
import { JwtService } from '@nestjs/jwt';
import { UserNotFoundError } from '../../domain/UserNotFoundError';

export class UserLogin {
  constructor(
    private repository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async run(
    email: string,
    plainPassword: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.repository.findByEmail(new UserEmail(email));
    if (!user) {
      throw new UserNotFoundError('User not found');
    }

    const password = UserPassword.fromHashed(user.password);
    const isValid = await password.validatePassword(plainPassword);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      userId: user.id.getValue(),
      email: user.email.getValue(),
    };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
