import { TestingModuleBuilder } from '@nestjs/testing';

export interface IProvider {
  configureTestEnvironment(builder: TestingModuleBuilder): Promise<void> | void;
  tearDownTestEnvironment(): Promise<void> | void;
}
