import { LogService } from './log.service';

describe('LogService', () => {
  let service: LogService;

  beforeEach(() => {
    service = new LogService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should log messages and retrieve them correctly', () => {
    const testMessage = 'Test message';
    service.log(testMessage);
    expect(service.getLogs()).toContain(testMessage);
  });

  it('should store multiple log entries', () => {
    service.log('First message');
    service.log('Second message');
    const logs = service.getLogs();
    expect(logs).toHaveLength(2);
    expect(logs).toEqual(expect.arrayContaining(['First message', 'Second message']));
  });
});
