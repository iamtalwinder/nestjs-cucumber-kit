import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpSteps, ICucumberKitConfig, MongoDBProvider, StorageSteps } from '../../lib';
import * as path from 'path';

export const config: ICucumberKitConfig = {
  steps: [HttpSteps, StorageSteps],
  providers: [MongoDBProvider],
  dataDir: path.join(__dirname, '..', 'data'),
  appConfigure: (app: INestApplication) => {
    app.useGlobalPipes(new ValidationPipe());
  },
};
