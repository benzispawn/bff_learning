import { AllExceptionsFilter } from './exception.filter';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;
  let mockGetResponse: jest.Mock;
  let mockGetRequest: jest.Mock;
  let mockHttpArgumentsHost: jest.Mock;

  beforeEach(() => {
    filter = new AllExceptionsFilter();
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    mockGetResponse = jest.fn().mockReturnValue({ status: mockStatus });
    mockGetRequest = jest.fn().mockReturnValue({ url: '/test' });
    mockHttpArgumentsHost = jest.fn().mockReturnValue({
      getResponse: mockGetResponse,
      getRequest: mockGetRequest,
    });

    jest
      .spyOn(Date.prototype, 'toISOString')
      .mockReturnValue('2023-01-01T00:00:00.000Z');
  });

  it('should handle HttpException', () => {
    const exception = new HttpException('Test error', HttpStatus.BAD_REQUEST);
    const host = {
      switchToHttp: mockHttpArgumentsHost,
    };

    filter.catch(exception, host as any);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockJson).toHaveBeenCalledWith({
      timestamp: '2023-01-01T00:00:00.000Z',
      path: '/test',
      error: 'Test error',
    });
  });

  it('should handle non-HttpException', () => {
    const exception = new Error('Internal server error');
    const host = {
      switchToHttp: mockHttpArgumentsHost,
    };

    filter.catch(exception, host as any);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockJson).toHaveBeenCalledWith({
      timestamp: '2023-01-01T00:00:00.000Z',
      path: '/test',
      error: 'Internal server error',
    });
  });

  it('should handle exception with no message', () => {
    const exception = {};
    const host = {
      switchToHttp: mockHttpArgumentsHost,
    };

    filter.catch(exception, host as any);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockJson).toHaveBeenCalledWith({
      timestamp: '2023-01-01T00:00:00.000Z',
      path: '/test',
      error: 'An error occurred',
    });
  });

  it('should handle exception with message object', () => {
    const exception = new HttpException(
      { message: 'Test error object' },
      HttpStatus.BAD_REQUEST,
    );
    const host = {
      switchToHttp: mockHttpArgumentsHost,
    };

    filter.catch(exception, host as any);

    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockJson).toHaveBeenCalledWith({
      timestamp: '2023-01-01T00:00:00.000Z',
      path: '/test',
      error: 'Test error object',
    });
  });
});
