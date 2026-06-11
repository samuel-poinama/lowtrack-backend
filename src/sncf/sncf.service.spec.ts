import { Test, TestingModule } from '@nestjs/testing';
import { SncfService } from './sncf.service';

const mockResponseData = { places: [] };

global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue(mockResponseData),
} as unknown as Response);

describe('SncfService', () => {
  let service: SncfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SncfService],
    }).compile();

    service = module.get<SncfService>(SncfService);
    jest.clearAllMocks();
  });

  it('should return data from the SNCF API', async () => {
    const response = await service.request('places', [{ q: 'Paris', from: 'Lyon' }]);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.sncf.com/v1/coverage/sncf/places?q=Paris&from=Lyon',
      expect.objectContaining({ headers: expect.any(Object) }),
    );
    expect(response).toEqual(mockResponseData);
  });
});
