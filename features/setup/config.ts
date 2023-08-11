import { HttpSteps, ICucumberKitConfig, StorageSteps } from 'nestjs-cucumber-kit';
import * as path from 'path';

export const config: ICucumberKitConfig = {
  steps: [HttpSteps, StorageSteps],
  dataDir: path.join(__dirname, '..', 'data'),
};
