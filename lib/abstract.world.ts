import { INestApplication, NestModule, Type } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ICucumberKitConfig } from './config.interface';

type Module = Type<NestModule> | any;

export class AbstractWorld {
  private appModule: Module;
  protected config: ICucumberKitConfig;
  public app: INestApplication | null;

  protected requestData: any;

  constructor(appModule: Module, config: ICucumberKitConfig) {
    this.appModule = appModule;
    this.config = config;
    this.app = null;
  }

  async startApp(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [this.appModule],
    }).compile();

    this.app = moduleFixture.createNestApplication();
    await this.configureApp();
    await this.app.init();
  }

  async stopApp(): Promise<void> {
    if (this.app) {
      await this.app.close();
      this.app = null;
    }
  }

  private async configureApp(): Promise<void> {
    if (this.config.appConfigure) {
      await this.config.appConfigure(this.app);
    }
  }
}
