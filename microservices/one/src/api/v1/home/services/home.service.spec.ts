import { Test, TestingModule } from '@nestjs/testing';
import { HomeService } from './home.service';
import { HttpTwoService } from '../../../../repositories/http-two/services/http-two.service';

// Mock the HttpTwoService
jest.mock('../../../../repositories/http-two/services/http-two.service');

describe('HomeService', () => {
  let homeService: HomeService;
  let httpTwoService: jest.Mocked<HttpTwoService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeService, HttpTwoService],
    }).compile();

    homeService = module.get<HomeService>(HomeService);
    httpTwoService = module.get(HttpTwoService) as jest.Mocked<HttpTwoService>;
  });

  it('should be defined', () => {
    expect(homeService).toBeDefined();
  });

  describe('getHome', () => {
    it('should call httpTwoService.get with the correct path', async () => {
      const mockHomeData = { data: 'Some home data' };
      httpTwoService.get.mockResolvedValue(mockHomeData);

      const result = await homeService.getHome();

      expect(httpTwoService.get).toHaveBeenCalledWith('/home');
      expect(result).toEqual(mockHomeData);
    });

    it('should throw an error if httpTwoService.get fails', async () => {
      const mockError = new Error('HTTP request failed');
      httpTwoService.get.mockRejectedValue(mockError);

      await expect(homeService.getHome()).rejects.toThrow(
        'HTTP request failed',
      );
    });
  });
});
