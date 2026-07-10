import { Test, TestingModule } from '@nestjs/testing';
import { HttpTwoModule } from './http-two.module';
import { HttpTwoService } from './services/http-two.service';

describe('HttpTwoModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HttpTwoModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide HttpTwoService', () => {
    const service = module.get<HttpTwoService>(HttpTwoService);
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(HttpTwoService);
  });

  it('should export HttpTwoService', async () => {
    const testModule = await Test.createTestingModule({
      imports: [HttpTwoModule],
    }).compile();

    const service = testModule.get<HttpTwoService>(HttpTwoService);
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(HttpTwoService);
  });
});
