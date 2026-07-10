import { getRequiredEnv } from './get-required-env'; // Adjust the import path as needed

describe('getRequiredEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    console.log = jest.fn(); // Mock console.log
  });

  afterAll(() => {
    process.env = originalEnv; // Restore original env after all tests
  });

  it('should return the value of an existing environment variable', () => {
    process.env.TEST_VAR = 'test-value';
    expect(getRequiredEnv('TEST_VAR')).toBe('test-value');
  });

  it('should return "dummyValue" and log a message when env variable is not found', () => {
    delete process.env.TEST_VAR;
    const result = getRequiredEnv('TEST_VAR');
    expect(result).toBe('dummyValue');
    expect(console.log).toHaveBeenCalledWith(
      'TEST_VAR not found in your .env file, ussing dummy value',
    );
  });

  it('should return "dummyValue" for an empty string env variable', () => {
    process.env.EMPTY_VAR = '';
    const result = getRequiredEnv('EMPTY_VAR');
    expect(result).toBe('dummyValue');
    expect(console.log).toHaveBeenCalledWith(
      'EMPTY_VAR not found in your .env file, ussing dummy value',
    );
  });

  it('should return the actual value for a non-empty string env variable', () => {
    process.env.NON_EMPTY_VAR = 'actual-value';
    expect(getRequiredEnv('NON_EMPTY_VAR')).toBe('actual-value');
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should return "dummyValue" for undefined env variable', () => {
    const result = getRequiredEnv('UNDEFINED_VAR');
    expect(result).toBe('dummyValue');
    expect(console.log).toHaveBeenCalledWith(
      'UNDEFINED_VAR not found in your .env file, ussing dummy value',
    );
  });
});
