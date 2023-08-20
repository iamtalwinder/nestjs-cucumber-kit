import { Module } from '@nestjs/common';
import { ItemModule } from './item';
import { UploadModule } from './upload/upload.module';
import { PrimitiveModule } from './primitive';

@Module({
  imports: [ItemModule, UploadModule, PrimitiveModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
