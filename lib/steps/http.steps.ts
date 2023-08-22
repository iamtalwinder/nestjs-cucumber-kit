import { Given, Then, Before, After } from '@cucumber/cucumber';
import { expect } from 'chai';
import * as fs from 'fs';
import * as path from 'path';
import supertest from 'supertest';
import { AbstractWorld } from '../abstract.world';
import { IStepDefinition } from './step-definition.interface';
import { SharedStorage } from '..';
import { DeepPartialMatcher } from '../utils';

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
        const request = HttpSteps.getReqeust.call(this, method, endpoint);

        if (this.requestData && this.requestData.files) {
          for (const [fieldName, filePath] of Object.entries(this.requestData.files)) {
            request.attach(fieldName, filePath);
          }
        }

        const response = await request;
        SharedStorage.set('response', response);
      },
    );

    Given(
      /^I send a (GET|POST|PUT|DELETE) request to API "([^"]*)" with JSON:$/,
      async function (this: AbstractWorld, method: string, endpoint: string, body: string) {
        const processedBody = JSON.parse(SharedStorage.replacePlaceholders(body));
        const request = HttpSteps.getReqeust.call(this, method, endpoint);

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

    Given(
      /^I upload file "([^"]*)" as form field "([^"]*)"$/,
      function (this: AbstractWorld, filePath: string, formFieldName: string) {
        const processedPath = SharedStorage.replacePlaceholders(filePath);
        const rootDataDir = this.config.dataDir || '.';
        const absolutePath = path.join(rootDataDir, processedPath);

        if (!fs.existsSync(absolutePath)) {
          throw new Error(`File not found: ${absolutePath}`);
        }

        if (!this.requestData) {
          this.requestData = { files: {} };
        }

        this.requestData.files[formFieldName] = absolutePath;
      },
    );

    Given(
      /^I send a GraphQL request to "([^"]*)" with the payload:$/,
      async function (this: AbstractWorld, endpoint: string, payload: string) {
        const graphqlPayload = { query: payload };
        const request = HttpSteps.getReqeust.call(this, 'post', endpoint);
        const response = await request.send(graphqlPayload);

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

    Then(/^the response should be string "(.*)"$/, function (this: AbstractWorld, expectedResponse: string) {
      const actualResponse = SharedStorage.get('response').text;
      expect(actualResponse).to.equal(expectedResponse);
    });

    Then(/^the response should be boolean (.*)$/, function (this: AbstractWorld, expectedResponse: string) {
      const actualResponse = SharedStorage.get('response').text;
      const expectedBoolean = expectedResponse === 'true';
      expect(actualResponse === 'true' || actualResponse === 'false').to.be.true; // Ensure it's a boolean response
      expect(actualResponse === 'true').to.equal(expectedBoolean);
    });

    Then(/^the response should be number (.*)$/, function (this: AbstractWorld, expectedResponse: string) {
      const actualResponse = SharedStorage.get('response').text;
      const expectedNumber = Number(expectedResponse);
      expect(!isNaN(expectedNumber)).to.be.true; // Ensure expected is a valid number
      expect(Number(actualResponse)).to.equal(expectedNumber);
    });

    Then(/^the response should exactly match JSON:$/, function (this: AbstractWorld, docString: string) {
      const expectedContent = JSON.parse(docString);
      const actualContent = SharedStorage.get('response').body;

      expect(actualContent).to.deep.equal(expectedContent);
    });

    Then(/^the response should contain JSON:$/, function (this: AbstractWorld, docString: string) {
      const expectedPartialContent = JSON.parse(docString);
      const actualContent = SharedStorage.get('response').body;

      DeepPartialMatcher.containsPartialDeep(actualContent, expectedPartialContent);
    });
  }

  static getReqeust(this: AbstractWorld, method: string, endpoint: string): any {
    const processedEndpoint = SharedStorage.replacePlaceholders(endpoint);

    const request = supertest(this.app?.getHttpServer())[method.toLowerCase()](processedEndpoint);

    const headers = SharedStorage.get('headers') || {};

    for (const [key, value] of Object.entries(headers)) {
      request.set(key, value);
    }

    return request;
  }
}
