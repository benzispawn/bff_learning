import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('../helpers/get-required-env', () => ({
  getRequiredEnv: jest.fn().mockReturnValue('test-secret'),
}));

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = {
      verifyAsync: jest.fn(),
    } as any;
    authGuard = new AuthGuard(jwtService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should throw UnauthorizedException if no token is provided', async () => {
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => ({ headers: {} }),
        }),
      };

      await expect(authGuard.canActivate(mockContext as any)).rejects.toThrow(
        new UnauthorizedException('Authentication required'),
      );
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: { authorization: 'Bearer invalid-token' },
          }),
        }),
      };

      (jwtService.verifyAsync as jest.Mock).mockRejectedValue(
        new Error('Invalid token'),
      );

      await expect(authGuard.canActivate(mockContext as any)).rejects.toThrow(
        new UnauthorizedException('Invalid Token'),
      );
    });

    it('should return true and set user in request if token is valid', async () => {
      const mockRequest = {
        headers: { authorization: 'Bearer valid-token' },
      };
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
      };

      const mockPayload = { userId: '123', username: 'testuser' };
      (jwtService.verifyAsync as jest.Mock).mockResolvedValue(mockPayload);

      const result = await authGuard.canActivate(mockContext as any);

      expect(result).toBe(true);
      expect(mockRequest['user']).toEqual(mockPayload);
      expect(jwtService.verifyAsync).toHaveBeenCalledWith('valid-token', {
        secret: 'test-secret',
      });
    });
  });

  describe('extractTokenFromHeader', () => {
    it('should return undefined if no authorization header', () => {
      const request = { headers: {} };
      expect(
        authGuard['extractTokenFromHeader'](request as any),
      ).toBeUndefined();
    });

    it('should return undefined if authorization header is not Bearer', () => {
      const request = { headers: { authorization: 'Basic token' } };
      expect(
        authGuard['extractTokenFromHeader'](request as any),
      ).toBeUndefined();
    });

    it('should return token if authorization header is Bearer', () => {
      const request = { headers: { authorization: 'Bearer token' } };
      expect(authGuard['extractTokenFromHeader'](request as any)).toBe('token');
    });
  });
});
