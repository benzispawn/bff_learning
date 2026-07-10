import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './services/login.service';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { LoginDTO } from './interfaces/login.dto';
import { UserDTO } from './interfaces/user.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const mockLoginService = {
  signIn: jest.fn(),
};
const mockJwtService = {};

describe('LoginController', () => {
  let loginController: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginService,
          useValue: mockLoginService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        AuthGuard,
      ],
    }).compile();
    loginController = module.get<LoginController>(LoginController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('postLogin', () => {
    it('should return a user DTO if login is successful', async () => {
      const loginDto: LoginDTO = {
        username: 'trailblazers',
        password: '12345',
      };
      const userDto: UserDTO = {
        _id: '123',
        username: 'trailblazers',
        accessToken: 'someAccessToken',
        password: '12345',
      };

      mockLoginService.signIn.mockResolvedValue(userDto);
      const result = await loginController.postLogin(loginDto);
      expect(result).toEqual(userDto);
      expect(mockLoginService.signIn).toHaveBeenCalledWith(loginDto);
    });

    it('should throw UnauthorizedException if login fails', async () => {
      const loginDto: LoginDTO = {
        username: 'wrongUser',
        password: 'wrongPassword',
      };
      mockLoginService.signIn.mockRejectedValue(new UnauthorizedException());
      await expect(loginController.postLogin(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockLoginService.signIn).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('getProtected', () => {
    it('should return the user from the request', async () => {
      const request = { user: { username: 'trailblazers' } };
      const result = await loginController.getProtected(request);
      expect(result).toEqual(request.user);
    });
  });
});
