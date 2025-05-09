import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';

interface PackageJson {
  version: string;
  name?: string;
  description?: string;
  [key: string]: any; // Allow additional properties
}

interface AppConfig {
  CORS_ALLOWED_ORIGIN: string;
  [key: string]: any; // Allow additional properties if needed
}

export const setupApp = (app: INestApplication) => {
  const packageJsonPath = path.resolve('package.json');
  const packageJson: PackageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, 'utf-8'),
  ) as PackageJson;

  if (typeof packageJson.version !== 'string') {
    throw new Error('Invalid package.json: "version" must be a string');
  }

  process.env.API_VERSION = packageJson.version;

  // app.set('trust proxy', true); //esto no me acuerdo para que era

  // esto es para validar los DTO
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // esto sirve para evitar que se meta churre en el endpoind
      forbidNonWhitelisted: true, // Throw an error if payload contains non-whitelisted properties
    }),
  );
  app.setGlobalPrefix('api/v1');

  const configService: ConfigService<AppConfig> = app.get(ConfigService);
  const corsAllowedOrigin: string = configService.getOrThrow<string>(
    'CORS_ALLOWED_ORIGIN',
  ); // Explicitly type as string
  app.enableCors({
    origin: corsAllowedOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
};
