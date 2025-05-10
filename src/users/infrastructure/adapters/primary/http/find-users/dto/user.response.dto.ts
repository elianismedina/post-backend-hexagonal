import { ResponseBaseDto } from '../../../../../../../shared/infrastructure/response-base.dto.abstract';
import { Expose, Type } from 'class-transformer';

export class UserResponseDto extends ResponseBaseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt?: Date;
}
