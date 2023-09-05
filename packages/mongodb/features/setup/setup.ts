import { setWorldConstructor } from '@cucumber/cucumber';
import { configureSteps } from '@nestjs-cucumber-kit/core';
import { config } from './config';
import { CustomWorld } from './world';

configureSteps(config.steps);
setWorldConstructor(CustomWorld);
