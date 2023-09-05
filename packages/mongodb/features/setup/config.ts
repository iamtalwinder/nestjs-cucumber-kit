import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { FixtureSteps, HttpSteps, StorageSteps, ICucumberKitConfig } from '@nestjs-cucumber-kit/core';
import { MongoDBProvider, MongoDBSteps } from '@nestjs-cucumber-kit/mongodb';

export const config: ICucumberKitConfig = {
  steps: [HttpSteps, StorageSteps, FixtureSteps, MongoDBSteps],
  providers: [MongoDBProvider],
  dataDir: path.join(__dirname, '..', 'data'),
  appConfigure: (app: INestApplication) => {
    app.useGlobalPipes(new ValidationPipe());
  },
};
