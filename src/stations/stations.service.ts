import { Injectable } from '@nestjs/common';
import { Station } from './entities/station.entity';
import { SncfService } from 'src/sncf/sncf.service';

@Injectable()
export class StationsService {
  constructor(
    private readonly sncfService: SncfService,
  ) {}

  async search(name: string): Promise<any> {
    const response = await this.sncfService.request('places', [{ q: name, 'type[]': 'stop_area' }]);
    if (response.places.length === 0) {
      return null;
    }


    const stations = response.places.map((place: any) => {
      return {
        id: place.id,
        name: place.name,
      } as Station;
    });

    return stations;
  }
  
}
