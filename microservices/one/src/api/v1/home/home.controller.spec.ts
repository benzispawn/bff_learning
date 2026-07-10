import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home.controller';
import { HomeService } from './services/home.service';
import { AuthGuard } from '../../../common/guards/auth.guard';

describe('HomeController', () => {
  let homeController: HomeController;
  let homeService: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [
        {
          provide: HomeService,
          useValue: {
            getHome: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    homeController = module.get<HomeController>(HomeController);
    homeService = module.get<HomeService>(HomeService);
  });

  describe('getHome', () => {
    it('should call homeService.getHome and return the result', async () => {
      const mockHomeData = { message: 'Welcome home!' };
      jest.spyOn(homeService, 'getHome').mockResolvedValue(mockHomeData);

      const result = await homeController.getHome();

      expect(homeService.getHome).toHaveBeenCalled();
      expect(result).toEqual(mockHomeData);
    });

    it('should throw an error if homeService.getHome fails', async () => {
      const mockError = new Error('Failed to get home data');
      jest.spyOn(homeService, 'getHome').mockRejectedValue(mockError);

      await expect(homeController.getHome()).rejects.toThrow(
        'Failed to get home data',
      );
    });
  });
});
