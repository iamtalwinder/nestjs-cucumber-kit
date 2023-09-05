import { IProvider } from '@nestjs-cucumber-kit/core';
import { TestingModuleBuilder } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createConnection } from 'mongoose';

const MONGODB_CONNECTION_NAME = 'MongooseConnectionName';
const DATABASE_CONNECTION = 'DatabaseConnection';

export class MongoDBProvider implements IProvider {
  private mongodb: MongoMemoryServer | null = null;

  async configureTestEnvironment(builder: TestingModuleBuilder) {
    if (!this.mongodb) {
      this.mongodb = await MongoMemoryServer.create();
    }
    const uri = this.mongodb.getUri();

    builder.overrideProvider(MONGODB_CONNECTION_NAME).useValue(DATABASE_CONNECTION);
    builder.overrideProvider(DATABASE_CONNECTION).useFactory({
      factory: async () => {
        return createConnection(uri);
      },
    });
  }

  async tearDownTestEnvironment() {
    if (this.mongodb) {
      await this.mongodb.stop();
    }
  }
}
