import { Given, Then, Before, After } from '@cucumber/cucumber';
import { expect } from 'chai';
import supertest from 'supertest';
import { AbstractWorld } from '../abstract.world';
import { IStepDefinition } from './step-definition.interface';
import { SharedStorage } from '..';

export class HttpSteps implements IStepDefinition {
  defineSteps() {
    Before(async function (this: AbstractWorld) {
      await this.startApp();
    });

    After(async function (this: AbstractWorld) {
      await this.stopApp();
    });

    Given(
      /^I send a (GET|POST|PUT|DELETE) request to API "([^"]*)"$/,
      async function (this: AbstractWorld, method: string, endpoint: string) {
        const processedEndpoint = SharedStorage.replacePlaceholders(endpoint);
        const response = await supertest(this.app?.getHttpServer())[method.toLowerCase()](processedEndpoint);
        SharedStorage.set('response', response);
      },
    );

    Given(
      /^I send a (GET|POST|PUT|DELETE) request to API "([^"]*)" with JSON:$/,
      async function (this: AbstractWorld, method: string, endpoint: string, body: string) {
        const processedEndpoint = SharedStorage.replacePlaceholders(endpoint);
        const processedBody = JSON.parse(SharedStorage.replacePlaceholders(body));
        const response = await supertest(this.app?.getHttpServer())
          [method.toLowerCase()](processedEndpoint)
          .send(processedBody);

        SharedStorage.set('response', response);
      },
    );

    Then(/^I store the response in key "([^"]*)"$/, function (this: AbstractWorld, key: string) {
      const response = SharedStorage.get('response');
      SharedStorage.set(key, response?.body);
    });

    Then(/^the response code should be (\d+)$/, function (this: AbstractWorld, expectedStatusCode: number) {
      const response = SharedStorage.get('response');
      expect(response.status).to.equal(expectedStatusCode);
    });

    Then(/^the response should contain JSON$/, function (this: AbstractWorld, docString: string) {
      const response = SharedStorage.get('response');
      expect(response.body).to.deep.equal(JSON.parse(docString));
    });
  }
}
