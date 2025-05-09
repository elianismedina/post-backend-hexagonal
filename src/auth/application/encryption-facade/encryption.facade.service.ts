import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class EncryptionFacadeService {
  constructor(private readonly configService: ConfigService) {}

  async hash(password: string): Promise<string> {
    // Implementation of the hash function
    return 'hashedPassword'; // Example return value
  }

  async compare(plain: string, encrypted: string): Promise<boolean> {
    return compare(plain, encrypted);
  }
}
