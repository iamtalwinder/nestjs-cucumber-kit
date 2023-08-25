import { INestApplication } from '@nestjs/common';
import { IStepDefinition } from './steps';
import { AbstractProvider } from './providers';

export type AppConfigureFunction = (app: INestApplication | null) => void | Promise<void>;

export interface ICucumberKitConfig {
  steps: Array<new () => IStepDefinition>;
  appConfigure?: AppConfigureFunction;
  dataDir?: string;
  providers?: Array<new () => AbstractProvider>;
}
