import { After, Before, Given, Then } from '@cucumber/cucumber';
import * as path from 'path';
import { expect } from 'chai';
import { AbstractWorld } from '../abstract.world';
import { IStepDefinition } from './step-definition.interface';
import { SharedStorage } from '..';

export class StorageSteps implements IStepDefinition {
  defineSteps() {
    Before(async function (this: AbstractWorld) {
      await this.startApp();
    });

    After(async function (this: AbstractWorld) {
      await this.stopApp();
    });

    Given(
      /^I store the key "([^"]*)" with the value "([^"]*)"$/,
      function (this: AbstractWorld, key: string, value: string) {
        SharedStorage.set(key, value);
      },
    );

    Given(/^I store the key "([^"]*)" with the JSON data:$/, function (this: AbstractWorld, key: string, json: string) {
      const jsonObject = JSON.parse(json);
      SharedStorage.set(key, jsonObject);
    });

    Given(/^I load key-value pairs from the JSON file "([^"]*)"$/, function (this: AbstractWorld, filePath: string) {
      const rootDataDir = this.config.dataDir || '.';
      const absolutePath = path.join(rootDataDir, filePath);

      SharedStorage.loadJsonFile(absolutePath);
    });

    Then(
      /^the key "([^"]*)" should have the value "([^"]*)"$/,
      function (this: AbstractWorld, key: string, expectedValue: string) {
        const actualValue = SharedStorage.get(key);
        expect(actualValue).to.deep.equal(expectedValue);
      },
    );

    Then(
      /^the key "([^"]*)" should contain the JSON:$/,
      function (this: AbstractWorld, key: string, expectedJson: string) {
        const actualValue = SharedStorage.get(key);
        const expectedValue = JSON.parse(expectedJson);
        expect(actualValue).to.deep.equal(expectedValue);
      },
    );
  }
}
