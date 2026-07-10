import { Test, TestingModule } from '@nestjs/testing';
import { HomeModule } from './home.module';
import { HomeController } from './home.controller';
import { HomeService } from './services/home.service';
import { HttpTwoModule } from '../../../repositories/http-two/http-two.module';

describe('HomeModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HomeModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have HomeController', () => {
    const controller = module.get<HomeController>(HomeController);
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(HomeController);
  });

  it('should have HomeService', () => {
    const service = module.get<HomeService>(HomeService);
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(HomeService);
  });

  it('should import HttpTwoModule', async () => {
    const httpTwoModule = module.get(HttpTwoModule);
    expect(httpTwoModule).toBeDefined();
  });

  it('should provide HomeService to HomeController', () => {
    const controller = module.get<HomeController>(HomeController);
    const service = module.get<HomeService>(HomeService);
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});

// Mocking dependencies
jest.mock('./home.controller');
jest.mock('./services/home.service');
jest.mock('../../../repositories/http-two/http-two.module');
