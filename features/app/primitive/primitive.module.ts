import { Module } from '@nestjs/common';
import { PrimitiveController } from './primitive.controller';

@Module({
  imports: [],
  controllers: [PrimitiveController],
  providers: [],
})
export class PrimitiveModule {}
