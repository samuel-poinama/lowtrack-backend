import { Test, TestingModule } from '@nestjs/testing';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';

const mockStationsService = {
  search: jest.fn(),
};

describe('StationsController', () => {
  let controller: StationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StationsController],
      providers: [{ provide: StationsService, useValue: mockStationsService }],
    }).compile();

    controller = module.get<StationsController>(StationsController);
    jest.clearAllMocks();
  });

  it('should return stations when found', async () => {
    const mockStations = [{ id: 'stop_area:SNCF:87686006', name: 'Paris' }];
    mockStationsService.search.mockResolvedValue(mockStations);

    const result = await controller.search('Paris');

    expect(mockStationsService.search).toHaveBeenCalledWith('Paris');
    expect(result).toEqual(mockStations);
  });

  it('should throw NotFoundException when no station is found', async () => {
    mockStationsService.search.mockResolvedValue(null);

    await expect(controller.search('nonexistent')).rejects.toThrow('Station not found');
  });
});
