import { IsEmail, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindOneParams {
  @ApiProperty({
    description: 'User ID (7-digit code starting with 57)',
    example: '5712345',
    pattern: '^57\\d{5}$',
  })
  @IsString()
  @Matches(/^57\d{5}$/, {
    message:
      'Invalid UserId format. It must be a 7-digit code starting with 57.',
  })
  id: string; // ID is still required for fetching, editing, or deleting a user
}

export class CreateUserDto {
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsString()
  name: string; // Name is required for creating a user

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string; // Email is required for creating a user

  @ApiProperty({
    description: 'User password (min 8 characters)',
    example: 'password123',
    minLength: 8,
  })
  @IsString()
  password: string;

  @ApiProperty({ description: 'User role', example: 'admin' }) // Add role field
  @IsString()
  role: string;
}

export class EditUserDto {
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsString()
  name: string; // Name is required for editing a user

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string; // Email is required for editing a user
}

export class LoginUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsString()
  password: string;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '5712345',
  })
  id: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User creation timestamp',
    example: '2024-03-20T12:00:00Z',
  })
  createdAt: Date;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'User information',
    type: UserResponseDto,
  })
  user: UserResponseDto;
}
