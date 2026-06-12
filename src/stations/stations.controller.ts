import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  async search(@Query('name') name: string) {
    const stations = await this.stationsService.search(name);

    if (stations === null) {
      throw new NotFoundException('Station not found');
    }

    return stations;
  }
}
