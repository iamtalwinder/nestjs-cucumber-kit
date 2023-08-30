import { Controller, Get } from '@nestjs/common';

@Controller('primitive')
export class PrimitiveController {
  @Get('boolean')
  getBoolean(): boolean {
    return true;
  }

  @Get('number')
  getNumber(): number {
    return 42;
  }

  @Get('string')
  getString(): string {
    return 'Hello, World!';
  }
}
