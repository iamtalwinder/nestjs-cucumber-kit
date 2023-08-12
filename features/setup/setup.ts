import { setWorldConstructor } from '@cucumber/cucumber';
import { configureSteps } from '../../lib';
import { config } from './config';
import { CustomWorld } from './world';

configureSteps(config.steps);
setWorldConstructor(CustomWorld);
