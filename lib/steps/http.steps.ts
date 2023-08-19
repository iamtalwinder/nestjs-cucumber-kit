import { Given, Then, Before, After } from '@cucumber/cucumber';
import { expect } from 'chai';
import supertest from 'supertest';
import { AbstractWorld } from '../abstract.world';
import { IStepDefinition } from './step-definition.interface';
import { SharedStorage } from '..';
import { INestApplication } from '@nestjs/common';

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
        const request = HttpSteps.getReqeust(this.app, method, endpoint);

        const response = await request.send();
        SharedStorage.set('response', response);
      },
    );

    Given(
      /^I send a (GET|POST|PUT|DELETE) request to API "([^"]*)" with JSON:$/,
      async function (this: AbstractWorld, method: string, endpoint: string, body: string) {
        const processedBody = JSON.parse(SharedStorage.replacePlaceholders(body));
        const request = HttpSteps.getReqeust(this.app, method, endpoint);

        const response = await request.send(processedBody);
        SharedStorage.set('response', response);
      },
    );

    Given(
      /^I set the request header "([^"]*)" to "([^"]*)"$/,
      function (this: AbstractWorld, headerName: string, headerValue: string) {
        const headers = SharedStorage.get('headers') || {};
        headers[headerName] = headerValue;
        SharedStorage.set('headers', headers);
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

  static getReqeust(app: INestApplication | null, method: string, endpoint: string): any {
    const processedEndpoint = SharedStorage.replacePlaceholders(endpoint);

    const request = supertest(app?.getHttpServer())[method.toLowerCase()](processedEndpoint);

    const headers = SharedStorage.get('headers') || {};

    for (const [key, value] of Object.entries(headers)) {
      request.set(key, value);
    }

    return request;
  }
}
