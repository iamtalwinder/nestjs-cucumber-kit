import { Module } from '@nestjs/common';
import { ItemModule } from './item';
import { MongooseModule } from '@nestjs/mongoose';
import environment from './environment';

@Module({
  imports: [ItemModule, MongooseModule.forRoot(environment.mongodb)],
  controllers: [],
  providers: [],
})
export class AppModule {}
