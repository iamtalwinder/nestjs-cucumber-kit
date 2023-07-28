import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LogService, LogModule } from '../../lib';

describe('LogModule (e2e)', () => {
  let app: INestApplication;
  let logService: LogService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LogModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logService = moduleFixture.get<LogService>(LogService);
  });

  it('should log and retrieve logs correctly', () => {
    const testMessage = 'Hello World';
    logService.log(testMessage);

    const logs = logService.getLogs();
    expect(logs).toContain(testMessage);
  });

  afterAll(async () => {
    await app.close();
  });
});
