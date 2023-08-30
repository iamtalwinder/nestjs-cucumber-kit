import { INestApplication } from '@nestjs/common';

export abstract class BaseFixture {
  protected app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
  }

  abstract apply(): Promise<void>;
}
