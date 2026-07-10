import { Test, TestingModule } from '@nestjs/testing';
import { HttpTwoService } from './http-two.service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('HttpTwoService', () => {
  let service: HttpTwoService;
  let mock: MockAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpTwoService],
    }).compile();

    service = module.get<HttpTwoService>(HttpTwoService);
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should make a GET request to the correct URL', async () => {
      const mockData = { id: 1, name: 'Test' };
      mock.onGet('http://two:3002/test').reply(200, mockData);

      const result = await service.get<typeof mockData>('/test');

      expect(result).toEqual(mockData);
    });

    it('should throw an error if path does not start with /', async () => {
      await expect(service.get('invalid-path')).rejects.toThrow(
        'Path must start with /',
      );
    });

    it('should handle API errors', async () => {
      mock
        .onGet('http://two:3002/error')
        .reply(500, { message: 'Internal Server Error' });

      await expect(service.get('/error')).rejects.toThrow(
        'Request failed with status code 500',
      );
    });

    it('should handle network errors', async () => {
      mock.onGet('http://two:3002/network-error').networkError();

      await expect(service.get('/network-error')).rejects.toThrow(
        'Network Error',
      );
    });

    it('should handle different response types', async () => {
      const mockArrayData = [{ id: 1 }, { id: 2 }];
      mock.onGet('http://two:3002/array').reply(200, mockArrayData);

      const result = await service.get<typeof mockArrayData>('/array');

      expect(result).toEqual(mockArrayData);
    });
  });
});
