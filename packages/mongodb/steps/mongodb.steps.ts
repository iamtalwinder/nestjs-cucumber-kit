import { Then } from '@cucumber/cucumber';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStepDefinition, SharedStorage, AbstractWorld, DeepPartialMatcher } from '@nestjs-cucumber-kit/core';

const MONGODB_RESULT_KEY = 'mongodb_result';

export class MongoDBSteps implements IStepDefinition {
  defineSteps() {
    Then(
      /^I (find|findOne) in model "([^"]*)" with JSON and store in "([^"]*)":$/,
      async function (
        this: AbstractWorld,
        operation: 'find' | 'findOne',
        modelName: string,
        storageKey: string,
        json: string,
      ) {
        const result = await MongoDBSteps.performDBOperation.call(this, operation, modelName, json);
        SharedStorage.set(storageKey, result);
      },
    );

    Then(
      /^I (find|findOne) in model "([^"]*)" with JSON:$/,
      async function (this: AbstractWorld, operation: 'find' | 'findOne', modelName: string, json: string) {
        const result = await MongoDBSteps.performDBOperation.call(this, operation, modelName, json);

        SharedStorage.set(MONGODB_RESULT_KEY, result);
      },
    );

    Then(/^the result should contain JSON:$/, async function (this: AbstractWorld, expectedJson: string) {
      const result = SharedStorage.get(MONGODB_RESULT_KEY);
      const expectedValue = JSON.parse(SharedStorage.replacePlaceholders(expectedJson));

      DeepPartialMatcher.containsPartialDeep(result, expectedValue);
    });

    Then(/^the result should exactly match JSON:$/, async function (this: AbstractWorld, expectedJson: string) {
      const result = SharedStorage.get(MONGODB_RESULT_KEY);
      const expectedValue = JSON.parse(SharedStorage.replacePlaceholders(expectedJson));

      expect(result).toEqual(expectedValue);
    });
  }

  static async performDBOperation(this: AbstractWorld, operation: 'find' | 'findOne', modelName: string, json: string) {
    const model: Model<any> = this.app.get(getModelToken(modelName));
    const criteria = JSON.parse(SharedStorage.replacePlaceholders(json));
    return operation === 'find' ? await model.find(criteria).exec() : await model.findOne(criteria).exec();
  }
}
