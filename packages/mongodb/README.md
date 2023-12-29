# @nestjs-cucumber-kit/mongodb

The `@nestjs-cucumber-kit/mongodb` is a MongoDB plugin for the NestJS Cucumber Kit. It replaces the standard MongoDB connection with an in-memory MongoDB server, facilitating easier and more efficient testing.

## Installation

Install the package using either npm or Yarn:

### Using npm:
```bash
npm install @nestjs-cucumber-kit/mongodb --save-dev
```

### Using Yarn:
```bash
yarn add @nestjs-cucumber-kit/mongodb --dev
```

## Configuration

To configure, add the following provider to your `config.js`:

### config.js

```ts
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
```

## Setting Up Test Data with Fixtures

You can add fixtures to set up your test data. Here's an example:

### data/fixture/item.fixture.ts

```ts
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BaseFixture } from '@nestjs-cucumber-kit/core';
import { Item, ItemDocument } from '../../app/item';

export default class ItemFixture extends BaseFixture {
  async apply(): Promise<void> {
    const itemModel: Model<ItemDocument> = this.app.get(getModelToken(Item.name));
    const items = [
      { _id: '1', name: 'test' },
      { _id: '2', name: 'test' },
    ];

    await itemModel.insertMany(items);
  }
}
```

## Usage Examples

Below are some scenarios illustrating how to use the plugin:

### Feature: MongoDB

```gherkin
Feature: MongoDB

  Background: Load data
    Given I load fixture from the file "fixture/item.fixture"

  Scenario: Find a single item and store the result
    Given I store the key "itemName" with the value "test"
    When I findOne in model "Item" with JSON and store in "item":
      """
      { "name": "{{itemName}}" }
      """
    Then the key "item" should contain JSON:
      """
      { "_id": "1", "name": "{{itemName}}" }
      """

  Scenario: Assert exact match for a single item
    When I findOne in model "Item" with JSON:
      """
      { "name": "test" }
      """
    And the result should contain JSON:
      """
      { "_id": "1", "name": "test" }
      """

  Scenario: Find multiple items and store the results
    When I find in model "Item" with JSON and store in "items":
      """
      { "name": "test" }
      """
    Then the key "items" should contain JSON:
      """
      [{ "_id": "1", "name": "test" }, { "_id": "2", "name": "test" }]
      """

  Scenario: Assert truthy & falsy
    When I find in model "Item" with JSON and store in "items":
      """
      { "name": "test" }
      """
    Then the key "items" should be truthy
    And I findOne in model "Item" with JSON and store in "item":
      """
      { "name": "test12344" }
      """
    Then the key "item" should be falsy
```

[Complete MongoDB example](https://github.com/iamtalwinder/nestjs-cucumber-kit/blob/main/packages/mongodb/features/tests/mongodb.feature).
