import { Module } from '@nestjs/common';
import { ItemModule } from './item';

@Module({
  imports: [ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
