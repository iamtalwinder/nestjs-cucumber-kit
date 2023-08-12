import { HttpSteps, ICucumberKitConfig, StorageSteps } from '../../lib';
import * as path from 'path';

export const config: ICucumberKitConfig = {
  steps: [HttpSteps, StorageSteps],
  dataDir: path.join(__dirname, '..', 'data'),
};
