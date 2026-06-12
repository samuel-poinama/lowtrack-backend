import { Module } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { SncfModule } from 'src/sncf/sncf.module';

@Module({
  imports: [SncfModule],
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule {}
