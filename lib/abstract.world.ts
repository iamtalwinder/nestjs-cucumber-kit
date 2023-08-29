import { INestApplication, NestModule, Type } from '@nestjs/common';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { ICucumberKitConfig } from './config.interface';
import { IProvider } from './providers';
import { SharedStorage } from './utils';

type Module = Type<NestModule> | any;

export class AbstractWorld {
  private appModule: Module;
  protected config: ICucumberKitConfig;
  public app: INestApplication | null;

  protected requestData: any;

  private providerInstances: IProvider[] = [];

  constructor(appModule: Module, config: ICucumberKitConfig) {
    this.appModule = appModule;
    this.config = config;
    this.app = null;
  }

  async startApp(): Promise<void> {
    const builder: TestingModuleBuilder = Test.createTestingModule({
      imports: [this.appModule],
    });

    await this.configureProviders(builder);

    const testingModule: TestingModule = await builder.compile();
    this.app = testingModule.createNestApplication();
    await this.configureApp();
    await this.app.init();
  }

  async stopApp(): Promise<void> {
    for (const providerInstance of this.providerInstances) {
      await providerInstance.tearDownTestEnvironment();
    }

    if (this.app) {
      await this.app.close();
      this.app = null;
    }

    SharedStorage.clear();
  }

  private async configureApp(): Promise<void> {
    if (this.config.appConfigure) {
      await this.config.appConfigure(this.app);
    }
  }

  private async configureProviders(builder: TestingModuleBuilder): Promise<void> {
    if (this.config.providers) {
      for (const ProviderClass of this.config.providers) {
        const provider = new ProviderClass();
        await provider.configureTestEnvironment(builder);
        this.providerInstances.push(provider);
      }
    }
  }
}
