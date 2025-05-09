import { Injectable } from '@nestjs/common';
import { ValidateUserService } from '../validate-user/validate-user.service';
import { JwtFacadeService } from '../jwt-facade/jwt.facade.service';
import { AuthRepository } from '../../../auth/infrastructure/adapters/secondary/db/user.repository';
import { UserDao } from '../../../auth/infrastructure/adapters/secondary/db/dao/user.dao';

interface JwtUserPayload {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

@Injectable()
export class SignInService {
  constructor(
    private validateUserService: ValidateUserService,
    private jwtFacadeService: JwtFacadeService,
    private userRepository: AuthRepository,
  ) {}

  async signin(
    email: string,
    password: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const user: UserDao = await this.validateUserService.validate(
      email,
      password,
    );

    // Map UserDao to JwtUserPayload
    const jwtPayload: JwtUserPayload = {
      id: user.id.toString(), // Convert id to string
      email: user.email,
      name: user.name || 'Unknown', // Provide a default value if name is undefined
      isAdmin: user.isAdmin,
    };

    const { token, refreshToken } =
      await this.jwtFacadeService.createJwtAndRefreshToken(jwtPayload);

    Object.assign(user, { refreshToken }); // Assign refreshToken to user

    await this.userRepository.save(user);

    return { token, refreshToken };
  }
}
