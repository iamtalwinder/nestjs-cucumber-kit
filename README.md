# @nestjs-cucumber-kit

`@nestjs-cucumber-kit` seamlessly integrates NestJS with CucumberJS, enhancing the experience of writing BDD-style end-to-end tests in NestJS applications. It simplifies the setup and execution of Cucumber tests, allowing developers to focus on writing test scenarios instead of configuration.


## Table of content
- [@nestjs-cucumber-kit](#nestjs-cucumber-kit)
   * [Installation](#installation)
      + [Using npm:](#using-npm)
      + [Using Yarn:](#using-yarn)
   * [Quick Start](#quick-start)
      + [1. Setup Cucumber in your NestJS project:](#1-setup-cucumber-in-your-nestjs-project)
         - [In cucumber.js file at the root of the project:](#in-cucumberjs-file-at-the-root-of-the-project)
         - [In package.json:](#in-packagejson)
         - [File structure at the root of the project:](#file-structure-at-the-root-of-the-project)
         - [Configuration files:](#configuration-files)
            * [config.ts](#configts)
            * [world.ts](#worldts)
            * [setup.ts](#setupts)
         - [HTTP Example:](#http-example)
   * [Steps](#steps)
      + [HTTP Steps](#http-steps)
         - [Sending HTTP Requests](#sending-http-requests)
         - [Sending HTTP Requests with JSON Body](#sending-http-requests-with-json-body)
         - [Setting Request Headers](#setting-request-headers)
         - [Uploading Files in Form](#uploading-files-in-form)
         - [Sending GraphQL Requests](#sending-graphql-requests)
         - [Storing Response in a Key](#storing-response-in-a-key)
         - [Asserting Response Code](#asserting-response-code)
         - [Asserting Response Content](#asserting-response-content)
         - [Validating Exact Match with JSON](#validating-exact-match-with-json)
         - [Validating Partial Match with JSON](#validating-partial-match-with-json)
      + [Storage Steps](#storage-steps)
         - [Storing Key-Value Pairs](#storing-key-value-pairs)
         - [Asserting Stored Values](#asserting-stored-values)
      + [Fixture Steps](#fixture-steps)
         - [Loading and Applying Fixtures](#loading-and-applying-fixtures)
   * [Providers in @nestjs-cucumber-kit](#providers-in-nestjs-cucumber-kit)
      + [Available Providers](#available-providers)
      + [Mongodb provider](#mongodb-provider)
         - [Installation](#installation-1)
            * [Using npm:](#using-npm-1)
            * [Using Yarn:](#using-yarn-1)
         - [Setup](#setup)
         - [MongoDB Steps ](#mongodb-steps)
            * [Performing Database Operations](#performing-database-operations)
            * [Asserting Database Operation Results](#asserting-database-operation-results)

## Installation

### Using npm:
```bash
npm install @nestjs-cucumber-kit/core --save-dev
```

### Using Yarn:
```bash
yarn add @nestjs-cucumber-kit/core --dev
```

## Quick Start

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

#### Configuration files:

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

## Steps

### HTTP Steps

#### Sending HTTP Requests
Sends an HTTP request to a specified API endpoint using the given method (GET, POST, PUT, DELETE).

**Usage:**
```gherkin
Given I send a GET request to API "/api/path"
```

#### Sending HTTP Requests with JSON Body
Sends an HTTP request with a JSON payload to a specified endpoint.

**Usage:**
```gherkin
Given I send a POST request to API "/api/path" with JSON:
  """
  { "key": "value" }
  """
```

#### Setting Request Headers
Sets a specific header for subsequent HTTP requests.

**Usage:**
```gherkin
Given I set the request header "Content-Type" to "application/json"
```

#### Uploading Files in Form
Attaches a file to the request for endpoints expecting file uploads.

**Usage:**
```gherkin
Given I upload file "path/to/file.jpg" as form field "image"
```

#### Sending GraphQL Requests
Facilitates sending GraphQL queries or mutations.

**Usage:**
```gherkin
Given I send a GraphQL request to "/graphql" with the payload:
  """
  query {
    user(id: "123") {
      name
    }
  }
  """
```

#### Storing Response in a Key
Stores the entire response body in a shared storage under a specified key.

**Usage:**
```gherkin
Then I store the response in key "userResponse"
```

#### Asserting Response Code
Checks if the response status code matches the expected value.

**Usage:**
```gherkin
Then the response code should be 200
```

#### Asserting Response Content
Validates if the response content matches the expected string, boolean, or number.

**Usage:**
```gherkin
Then the response should be string "Success"
Then the response should be boolean true
Then the response should be number 42
```

#### Validating Exact Match with JSON
Asserts if the response JSON exactly matches the expected structure.

**Usage:**
```gherkin
Then the response should exactly match JSON:
  """
  { "key": "expected value" }
  """
```

#### Validating Partial Match with JSON
Checks if the response JSON contains the expected fields and values.

**Usage:**
```gherkin
Then the response should contain JSON:
  """
  { "key": "expected partial value", "wildcard": "*" }
  """
```


### Storage Steps

#### Storing Key-Value Pairs

- **Store a Simple Value**:
  Stores a simple value (string, number, etc.) in shared storage under a specified key.

  **Usage:**
  ```gherkin
  Given I store the key "username" with the value "JohnDoe"
  ```

- **Store JSON Data**:
  Stores a JSON object in shared storage.

  **Usage:**
  ```gherkin
  Given I store the key "user" with the JSON data:
    """
    { "name": "John Doe", "age": 30 }
    """
  ```

- **Load Data from JSON File**:
  Loads key-value pairs from a JSON file into shared storage.

  **Usage:**
  ```gherkin
  Given I load key-value pairs from the JSON file "path/to/data.json"
  ```

#### Asserting Stored Values

- **Assert Exact Value**:
  Asserts that the value stored under a specific key matches the expected value.

  **Usage:**
  ```gherkin
  Then the key "username" should have the value "JohnDoe"
  ```

- **Assert Exact JSON Match**:
  Asserts that the JSON stored under a specific key exactly matches the expected JSON structure.

  **Usage:**
  ```gherkin
  Then the key "user" should exactly match JSON:
    """
    { "name": "John Doe", "age": 30 }
    """
  ```

- **Assert JSON Partial match**:
  Asserts that the JSON stored under a specific key contains the expected partial JSON data.

  **Usage:**
  ```gherkin
  Then the key "user" should contain JSON:
    """
    { "name": "John Doe" }
    """
  ```

- **Assert Truthy Value**:
  Asserts that the value stored under a specific key is truthy.

  **Usage:**
  ```gherkin
  Then the key "isUserLoggedIn" should be truthy
  ```

- **Assert Falsy Value**:
  Asserts that the value stored under a specific key is falsy.

  **Usage:**
  ```gherkin
  Then the key "isUserLoggedIn" should be falsy
  ```




### Fixture Steps

#### Loading and Applying Fixtures

- **Load Fixture from File**:
  This step loads and applies a fixture from a specified file. Fixtures are used to set up a specific state in your application or database before the actual tests are executed. A fixture could be anything from seeding a database with specific data to configuring certain application states.

  **Usage:**
  ```gherkin
  Given I load fixture from the file "path/to/fixture"
  ```

  **Example:**
  Suppose you have a fixture file at `data/fixture/user.fixture.ts` that seeds users into your database. The file might look something like this:

  ```typescript
  // data/fixture/user.fixture.ts
  import { Model } from 'mongoose';
  import { getModelToken } from '@nestjs/mongoose';
  import { BaseFixture } from '@nestjs-cucumber-kit/core';
  import { User, UserDocument, UserRole } from 'src/user';
  import { EncryptionService } from 'src/common';

  export default class UserFixture extends BaseFixture {
    async apply(): Promise<void> {
      const userModel: Model<UserDocument> = this.app.get(getModelToken(User.name));

      const hashedPassword = await EncryptionService.hash('ProductAPI@999');

      const users: User[] = [
        { 
          _id: '1', 
          email: 'customer@gmail.com',
          firstName: 'customer',
          lastName: 'customer',
          password: hashedPassword,
          role: UserRole.customer,
        },
      ];

      await userModel.insertMany(users);
    }
  }

  ```

  To load and apply this fixture in a test, you would use:

  ```gherkin
  Given I load fixture from the file "data/fixture/user.fixture"
  ```


## Providers in @nestjs-cucumber-kit

Providers in the `@nestjs-cucumber-kit` play a crucial role in extending and customizing the functionality of the testing framework. They are modular components that can be plugged into the kit to provide additional capabilities, specifically tailored for different aspects of a NestJS application.


### Available Providers

Each provider in the `@nestjs-cucumber-kit` is targeted towards a specific area or technology, enhancing the toolkit's ability to handle a variety of testing scenarios in a NestJS application.

1. **MongoDB Provider**:
   - **Purpose**: Facilitates testing with MongoDB, including setting up an in-memory MongoDB instance for integration testing.

2. **(Additional Providers)**:
   - More providers will be added soon


### Mongodb provider

#### Installation

##### Using npm:
```bash
npm install @nestjs-cucumber-kit/mongodb --save-dev
```

##### Using Yarn:
```bash
yarn add @nestjs-cucumber-kit/mongodb --dev
```
#### Setup
Add mongodb provider and steps in config.

```typescript
// Example configuration snippet for MongoDB Provider
import { MongoDBProvider, MongoDBSteps } from '@nestjs-cucumber-kit/mongodb';

export const config = {
  // ...other configurations
  providers: [MongoDBProvider],
  steps: [MongoDBSteps],
  // ...other configurations
};
```
#### MongoDB Steps 

##### Performing Database Operations

- **Find or FindOne with JSON and Store in Key**:
  Executes a `find` or `findOne` operation on a specified model with JSON criteria and stores the result in shared storage under a specified key.

  **Usage:**
  ```gherkin
  Then I find in model "User" with JSON and store in "userData":
    """
    { "name": "John Doe" }
    """
  ```

- **Find or FindOne with JSON**:
  Similar to the above, but stores the result in a default key for subsequent assertions.

  **Usage:**
  ```gherkin
  Then I findOne in model "User" with JSON:
    """
    { "name": "John Doe" }
    """
  ```

##### Asserting Database Operation Results

- **Assert Result Contains JSON**:
  Asserts that the result from the previous database operation contains the expected JSON data.

  **Usage:**
  ```gherkin
  Then the result should contain JSON:
    """
    { "email": "john@example.com" }
    """
  ```

- **Assert Result Exactly Matches JSON**:
  Asserts that the result from the database operation exactly matches the expected JSON structure.

  **Usage:**
  ```gherkin
  Then the result should exactly match JSON:
    """
    { "_id": "123", "name": "John Doe", "email": "john@example.com" }
    """
  ```

- **Assert Result is Truthy**:
  Asserts that the result of the database operation is truthy.

  **Usage:**
  ```gherkin
  Then the result should be truthy
  ```

- **Assert Result is Falsy**:
  Asserts that the result of the database operation is falsy.

  **Usage:**
  ```gherkin
  Then the result should be falsy
  ```






