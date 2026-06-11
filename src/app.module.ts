import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StationsModule } from './stations/stations.module';
import { SncfModule } from './sncf/sncf.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    StationsModule,
  ],
})
export class AppModule {}
