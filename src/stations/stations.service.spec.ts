import { Test, TestingModule } from '@nestjs/testing';
import { StationsService } from './stations.service';
import { SncfService } from '../sncf/sncf.service';

const mockSncfService = {
  request: jest.fn(),
};

describe('StationsService', () => {
  let service: StationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StationsService,
        { provide: SncfService, useValue: mockSncfService },
      ],
    }).compile();

    service = module.get<StationsService>(StationsService);
    jest.clearAllMocks();
  });

  it('should return an array of stations', async () => {
    mockSncfService.request.mockResolvedValue({
      places: [{ id: 'stop_area:SNCF:87686006', name: 'station' }],
    });

    const result = await service.search('station');

    expect(result).not.toBeNull();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].name).toBe('station');
    expect(result[0].id).toBe('stop_area:SNCF:87686006');
  });

  it('should return null if no stations are found', async () => {
    mockSncfService.request.mockResolvedValue({ places: [] });

    const result = await service.search('nonexistent');

    expect(result).toBeNull();
  });
});
