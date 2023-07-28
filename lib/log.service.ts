import { Injectable } from '@nestjs/common';

@Injectable()
export class LogService {
  private logs: string[] = [];

  log(message: string): void {
    this.logs.push(message);
    console.log(message);
  }

  getLogs(): string[] {
    return this.logs;
  }
}
