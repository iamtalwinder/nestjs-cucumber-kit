import { MongoMemoryServer } from 'mongodb-memory-server';
import { TestingModuleBuilder } from '@nestjs/testing';
import { AbstractProvider } from './abstract-provider';
import { createConnection } from 'mongoose';

export class MongoDBProvider extends AbstractProvider {
  private mongodb: MongoMemoryServer | null = null;

  async configureTestEnvironment(builder: TestingModuleBuilder) {
    if (!this.mongodb) {
      this.mongodb = await MongoMemoryServer.create();
    }
    const uri = this.mongodb.getUri();

    builder.overrideProvider('MongooseConnectionName').useValue('DatabaseConnection');
    builder.overrideProvider('DatabaseConnection').useFactory({
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
