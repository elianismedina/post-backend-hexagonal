import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}

  public getAPIData(): any {
    return {
      env: this.config.getOrThrow<string>('NODE_ENV'),
      version: this.config.getOrThrow<string>('API_VERSION'),
    };
  }
}
