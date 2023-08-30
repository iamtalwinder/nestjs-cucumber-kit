import { Module } from '@nestjs/common';
import { UplaodController } from './upload.controller';

@Module({
  controllers: [UplaodController],
})
export class UploadModule {}
