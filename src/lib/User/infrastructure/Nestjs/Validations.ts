import { IsEmail, IsString, Matches } from 'class-validator';

export class FindOneParams {
  @IsString()
  @Matches(/^57\d{5}$/, {
    message:
      'Invalid UserId format. It must be a 7-digit code starting with 57.',
  })
  id: string; // ID is still required for fetching, editing, or deleting a user
}

export class Create {
  @IsString()
  name: string; // Name is required for creating a user

  @IsEmail()
  email: string; // Email is required for creating a user
}

export class Edit {
  @IsString()
  name: string; // Name is required for editing a user

  @IsEmail()
  email: string; // Email is required for editing a user
}
