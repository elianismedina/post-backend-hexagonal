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
} from '@nestjs/common';
import { UserGetAll } from '../../application/UserGetAll/UserGetAll';
import { UserGetOneById } from '../../application/UserGetOneById/UserGetOneById';
import { UserCreate } from '../../application/UserCreate/UserCreate';
import { UserEdit } from '../../application/UserEdit/UserEdit';
import { UserDelete } from '../../application/UserDelete/UserDelete';
import { UserRegister } from '../../application/UserRegister/UserRegister';
import { UserLogin } from '../../application/UserLogin/UserLogin';
import { Edit, FindOneParams } from './Validations'; // Rename imported Create to CreateDto
import { UserNotFoundError } from '../../domain/UserNotFoundError';

@Controller('user')
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
  async getAll() {
    return (await this.userGetAll.run()).map((u) => u.toPlainObject());
  }

  @Get(':id')
  async getOneById(@Param() params: FindOneParams) {
    try {
      return await this.userGetOneById.run(params.id); // Ensure params.id is valid
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
      throw error;
    }
  }

  @Post()
  async create(
    @Body() body: { name: string; email: string; password: string },
  ) {
    return await this.userCreate.run(
      body.name,
      body.email,
      body.password,
      new Date(),
    );
  }

  @Put(':id')
  async edit(@Param() params: FindOneParams, @Body() body: Edit) {
    return await this.userEdit.run(
      params.id,
      body.name,
      body.email,
      new Date(),
    );
  }

  @Delete(':id')
  async delete(@Param() params: FindOneParams) {
    return await this.userDelete.run(params.id);
  }

  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string },
  ) {
    return await this.userRegister.run(
      body.name,
      body.email,
      body.password,
      new Date(),
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return await this.userLogin.run(body.email, body.password);
  }
}
