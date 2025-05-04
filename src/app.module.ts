import { Module } from '@nestjs/common';
import { UserModule } from './lib/User/infrastructure/Nestjs/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmUserEntity } from './lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [TypeOrmUserEntity],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
