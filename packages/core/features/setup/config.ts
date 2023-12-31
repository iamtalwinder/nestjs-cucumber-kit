import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { FixtureSteps, HttpSteps, StorageSteps, ICucumberKitConfig } from '../../';

export const config: ICucumberKitConfig = {
  steps: [HttpSteps, StorageSteps, FixtureSteps],
  dataDir: path.join(__dirname, '..', 'data'),
  appConfigure: (app: INestApplication) => {
    app.useGlobalPipes(new ValidationPipe());
  },
};
