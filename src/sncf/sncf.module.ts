import { Module } from '@nestjs/common';
import { SncfService } from './sncf.service';

@Module({
  providers: [SncfService],
  exports: [SncfService],
})
export class SncfModule {}
