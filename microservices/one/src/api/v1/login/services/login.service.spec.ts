// src/auth/login.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { UserDTO } from '../interfaces/user.dto';
import { LoginDTO } from '../interfaces/login.dto';

const mockUsersService = {
  isUserRegistered: jest.fn(),
  saveUser: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn(),
};

describe('LoginService', () => {
  let loginService: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    loginService = module.get<LoginService>(LoginService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should throw UnauthorizedException if user is not registered', async () => {
      const loginDto: LoginDTO = {
        username: 'wrongUser',
        password: 'wrongPassword',
      };
      mockUsersService.isUserRegistered.mockReturnValue(false);

      await expect(loginService.signIn(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should sign in the user and return a UserDTO with accessToken', async () => {
      const loginDto: LoginDTO = {
        username: 'trailblazers',
        password: '12345',
      };
      const registeredUser = {
        _id: '123',
        username: 'trailblazers',
        hashedPassword: 'hashedPassword',
        toJSON: jest.fn().mockReturnValue({ username: 'trailblazers' }),
      };
      const accessToken = 'some.jwt.token';

      mockUsersService.isUserRegistered.mockReturnValue(true);
      mockUsersService.saveUser.mockResolvedValue(registeredUser);
      mockJwtService.signAsync.mockResolvedValue(accessToken);

      const result = await loginService.signIn(loginDto);

      expect(result).toBeInstanceOf(UserDTO);
      expect(result).toEqual({
        _id: '123',
        username: 'trailblazers',
        password: 'hashedPassword',
        accessToken: accessToken,
      });
      expect(mockUsersService.isUserRegistered).toHaveBeenCalledWith(loginDto);
      expect(mockUsersService.saveUser).toHaveBeenCalledWith(loginDto);
      expect(mockJwtService.signAsync).toHaveBeenCalledWith(
        registeredUser.toJSON(),
      );
    });
  });
});
