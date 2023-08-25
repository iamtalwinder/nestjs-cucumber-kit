import { TestingModuleBuilder } from '@nestjs/testing';

export abstract class AbstractProvider {
  abstract configureTestEnvironment(builder: TestingModuleBuilder): Promise<void> | void;
  abstract tearDownTestEnvironment(): Promise<void> | void;
}
