# @nestjs-cucumber-kit/core

`@nestjs-cucumber-kit/core` seamlessly integrates NestJS with CucumberJS, enhancing the experience of writing BDD-style end-to-end tests in NestJS applications. It simplifies the setup and execution of Cucumber tests, allowing developers to focus on writing test scenarios instead of configuration.

## Installation

### Using npm:
```bash
npm install @nestjs-cucumber-kit/core --save-dev
```

### Using Yarn:
```bash
yarn add @nestjs-cucumber-kit/core --dev
```

## Basic Usage

Follow these steps to integrate `@nestjs-cucumber-kit/core` into your NestJS project:

### 1. Setup Cucumber in your NestJS project:

#### In cucumber.js file at the root of the project:
```js
const args = [
  '--format progress',
  '--parallel 1',
  '--require-module ts-node/register/transpile-only',
  '--require features/setup/**/*.ts',
  '--exit',
];

module.exports = { default: args.join(' ') };
```

#### In package.json:
```json
{
  "scripts": { 
    "test:e2e": "cucumber-js" 
  }
}
```

#### File structure at the root of the project:
```
feature/
  data/               # Data needed for testing
  setup/
    config.ts         # Configure lib
    setup.ts          # Setup world and lib
    world.ts          # Add custom world
  step-definitions/   # Custom step definitions
  tests/
```

#### Examples of configuration files:

##### config.ts
```ts
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { FixtureSteps, HttpSteps, StorageSteps, ICucumberKitConfig } from '@nestjs-cucumber-kit/core';

export const config: ICucumberKitConfig = {
  steps: [HttpSteps, StorageSteps, FixtureSteps],
  dataDir: path.join(__dirname, '..', 'data'),
  appConfigure: (app: INestApplication) => {
    app.useGlobalPipes(new ValidationPipe());
  },
};
```

##### world.ts
```ts
import { AbstractWorld } from '@nestjs-cucumber-kit/core';
import { AppModule } from '../app/app.module';
import { config } from './config';

export class CustomWorld extends AbstractWorld {
  constructor() {
    super(AppModule, config);
  }
}
```

##### setup.ts
```ts
import { setWorldConstructor } from '@cucumber/cucumber';
import { configureSteps } from '@nestjs-cucumber-kit/core';
import { config } from './config';
import { CustomWorld } from './world';

configureSteps(config.steps);
setWorldConstructor(CustomWorld);
```

### 2. Example Test Scenarios:

#### Graphql Example:
```gherkin
Feature: GraphQL API interaction

  Scenario: Retrieve an item by ID
    Given I send a GraphQL request to "/graphql" with the payload:
      """
      query {
        getItem(id: "1") {
          _id
          name
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "getItem": {
            "_id": "1",
            "name": "test"
          }
        }
      }
      """
```
[Complete graphql example](https://github.com/iamtalwinder/nestjs-cucumber-kit/blob/main/packages/core/features/tests/graphql.feature).

#### HTTP Example:
HTTP

```gherkin
Feature: HTTP
  Scenario: Send Request with custom header
    Given I store the key "accessToken" with the value "token"
    Given I store the key "itemName" with the value "New Item"
    Given I set the request header "Authorization" to "Bearer {{accessToken}}"
    When I send a POST request to API "/item" with JSON:
      """
      { "name": "{{itemName}}" }
      """
    Then the response code should be 201
    And the response should contain JSON:
      """
      { "_id": "*", "name": "{{itemName}}" }
      """
```
[Complete http example](https://github.com/iamtalwinder/nestjs-cucumber-kit/blob/main/packages/core/features/tests/http.feature).

#### File Upload Example:
```gherkin
Feature: HTTP upload

  Scenario: Uploading an image file
    Given I set the request header "Content-Type" to "multipart/form-data"
    And I upload file "image.jpeg" as form field "image"
    When I send a POST request to API "/upload"
    Then the response code should be 201
    And the response should contain JSON:
    """
    {
      "message": "File uploaded successfully"
    }
    """
```

#### Storage Example:
```gherkin
Feature: storage

  Scenario: Store single value
    Given I store the key "username" with the value "John Doe"
    And the key "username" should have the value "John Doe"

  Scenario: Store json
    Given I store the key "name" with the value "John Doe"
    Given I store the key "user" with the JSON data:
      """
      { "name": "John Doe", "age": 30 }
      """
    And the key "user" should contain JSON:
      """
      { "name": "{{name}}", "age": 30 }
      """
```
[Complete storage example](https://github.com/iamtalwinder/nestjs-cucumber-kit/blob/main/packages/core/features/tests/storage.feature).

#### Primitive Assertions Example:
```gherkin
Feature: Primitive value responses

  Scenario: Get a boolean value
    When I send a GET request to API "/primitive/boolean"
    Then the response should be boolean true

  Scenario: Get a number value
    When I send a GET request to API "/primitive/number"
    Then the response should be number 42

  Scenario: Get a string value
    When I send a GET request to API "/primitive/string"
    Then the response should be string "Hello, World!"

```

## Features

- **Easy Integration**: Integrates NestJS with CucumberJS.
- **Custom Steps Support**: Write your own step definitions.
- **Shared Storage**: Share data between steps.
- **Fixture Support**: Easily set up test data.

For detailed setup, usage, and advanced configurations, visit the [NestJS Cucumber Kit Documentation](https://github.com/iamtalwinder/nestjs-cucumber-kit.git#readme).
