import { Given } from '@cucumber/cucumber';
import * as path from 'path';
import { IStepDefinition } from './step-definition.interface';
import { AbstractWorld } from '../abstract.world';

export class FixtureSteps implements IStepDefinition {
  defineSteps() {
    Given(/^I load fixture from the file "([^"]*)"$/, async function (this: AbstractWorld, fixturePath: string) {
      const rootDataDir = this.config.dataDir || '.';
      const absolutePath = path.join(rootDataDir, fixturePath);
      const fixtureModule = await import(absolutePath);

      if (fixtureModule && fixtureModule.default) {
        const fixtureInstance = new fixtureModule.default(this.app);
        await fixtureInstance.apply();
      } else {
        throw new Error(`Fixture module not found or does not have a default export: ${fixturePath}`);
      }
    });
  }
}
