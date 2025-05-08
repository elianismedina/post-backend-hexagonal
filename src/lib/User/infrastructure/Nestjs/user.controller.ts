import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserGetAll } from '../../application/UserGetAll/UserGetAll';
import { UserGetOneById } from '../../application/UserGetOneById/UserGetOneById';
import { UserCreate } from '../../application/UserCreate/UserCreate';
import { UserEdit } from '../../application/UserEdit/UserEdit';
import { UserDelete } from '../../application/UserDelete/UserDelete';
import { UserRegister } from '../../application/UserRegister/UserRegister';
import { UserLogin } from '../../application/UserLogin/UserLogin';
import {
  FindOneParams,
  CreateUserDto,
  EditUserDto,
  LoginUserDto,
  UserResponseDto,
  LoginResponseDto,
} from './Validations';
import { UserNotFoundError } from '../../domain/UserNotFoundError';
import { Roles } from './../../application/Roles/Roles';
import { RolesGuard } from './../../application/RolesGuard/RolesGuard';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(
    @Inject('UserGetAll') private readonly userGetAll: UserGetAll,
    @Inject('UserGetOneById') private readonly userGetOneById: UserGetOneById,
    @Inject('UserCreate') private readonly userCreate: UserCreate,
    @Inject('UserEdit') private readonly userEdit: UserEdit,
    @Inject('UserDelete') private readonly userDelete: UserDelete,
    @Inject('UserRegister') private readonly userRegister: UserRegister,
    @Inject('UserLogin') private readonly userLogin: UserLogin,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [UserResponseDto],
  })
  @Roles('admin', 'superadmin') // Restrict access to admins
  async getAll() {
    return (await this.userGetAll.run()).map((u) => u.toPlainObject());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getOneById(@Param() params: FindOneParams) {
    try {
      return await this.userGetOneById.run(params.id);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() body: CreateUserDto) {
    return await this.userCreate.run(
      body.name,
      body.email,
      body.password,
      new Date(),
      body.role, // Pass the role to UserCreate.run
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async edit(@Param() params: FindOneParams, @Body() body: EditUserDto) {
    return await this.userEdit.run(
      params.id,
      body.name,
      body.email, // Removed the unnecessary 'new Date()' argument
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async delete(@Param() params: FindOneParams) {
    return await this.userDelete.run(params.id);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async register(@Body() body: CreateUserDto) {
    return await this.userRegister.run(
      body.name,
      body.email,
      body.password,
      new Date(),
      body.role, // Pass the role to UserRegister.run
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() body: LoginUserDto) {
    return await this.userLogin.run(body.email, body.password);
  }
}
