import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { FixtureSteps, HttpSteps, MongoDBSteps, StorageSteps, ICucumberKitConfig, MongoDBProvider } from '../../lib';

export const config: ICucumberKitConfig = {
  steps: [HttpSteps, StorageSteps, FixtureSteps, MongoDBSteps],
  providers: [MongoDBProvider],
  dataDir: path.join(__dirname, '..', 'data'),
  appConfigure: (app: INestApplication) => {
    app.useGlobalPipes(new ValidationPipe());
  },
};
