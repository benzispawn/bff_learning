import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home.controller';
import { HomeService } from './services/home.service';
import { AuthGuard } from '../../../common/guards/auth.guard';

describe('HomeController', () => {
  let homeController: HomeController;
  let homeService: HomeService;

  beforeEach(async () => {
    const mockHomeService = {
      getHome: jest.fn().mockResolvedValue({ message: 'Home data' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [
        {
          provide: HomeService,
          useValue: mockHomeService,
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
    it('should return home data', async () => {
      const result = await homeController.getHome();
      expect(result).toEqual({ message: 'Home data' });
      expect(homeService.getHome).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      jest
        .spyOn(homeService, 'getHome')
        .mockRejectedValue(new Error('Test error'));

      await expect(homeController.getHome()).rejects.toThrow('Test error');
    });
  });
});
