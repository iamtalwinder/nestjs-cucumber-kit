import { INestApplication } from '@nestjs/common';
import { IStepDefinition } from './steps';

export type AppConfigureFunction = (app: INestApplication | null) => void | Promise<void>;

export interface ICucumberKitConfig {
  steps: Array<new () => IStepDefinition>;
  appConfigure?: AppConfigureFunction;
  dataDir?: string;
}
