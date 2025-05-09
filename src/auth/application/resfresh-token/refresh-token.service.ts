import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtFacadeService } from '../jwt-facade/jwt.facade.service';
import { AuthRepository } from '../../../auth/infrastructure/adapters/secondary/db/user.repository';

@Injectable()
export class RefreshTokenService {
  constructor(
    private jwtFacadeService: JwtFacadeService,
    private userRepository: AuthRepository,
  ) {}

  async refreshTokens(email: string, refreshToken: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    if (!user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    await this.jwtFacadeService.verifyToken(refreshToken);

    const refreshTokenMatches = refreshToken === user.refreshToken;
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    // Map UserDao to JwtUserPayload
    const jwtPayload = {
      id: user.id.toString(), // Convert id to string
      email: user.email,
      name: user.name || 'Unknown', // Provide a default value if name is undefined
      isAdmin: user.isAdmin,
    };

    const { token, refreshToken: newRefreshToken } =
      await this.jwtFacadeService.createJwtAndRefreshToken(jwtPayload);

    Object.assign(user, { refreshToken: newRefreshToken });

    await this.userRepository.save(user);

    return { token, refreshToken: newRefreshToken };
  }
}
