import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/infrastructure/guards/jwt-auth.guard';
import * as dbConfig from '../config/db/database.config';
dotenv.config();

@Module({
  imports: [
    // Environment
    ConfigModule.forRoot({
      envFilePath: `./src/config/environments/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      cache: true,
    }),
    // Database
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        dbConfig.default(configService),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD, // Proteger la app con JWT, por defautl debes estar autenticado para acceder a cualquier ruta
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
