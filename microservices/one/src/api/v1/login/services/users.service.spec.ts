import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { LoginDTO } from '../interfaces/login.dto';

const mockUserModel = {
  findOne: jest.fn(),
  exec: jest.fn(),
  create: jest.fn(),
  deleteMany: jest.fn().mockReturnThis(),
};

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('saveUser', () => {
    it('should save a new user if not registered', async () => {
      const loginDto: LoginDTO = { username: 'newUser', password: 'password' };

      mockUserModel.deleteMany.mockReturnValue({ exec: jest.fn() });

      const createdUser = {
        username: loginDto.username,
        hashedPassword: 'hashedPassword',
      };
      mockUserModel.create.mockResolvedValue(createdUser);

      const result = await usersService.saveUser(loginDto);

      expect(mockUserModel.deleteMany).toHaveBeenCalled();
      expect(mockUserModel.create).toHaveBeenCalledWith({
        username: loginDto.username,
        hashedPassword: expect.any(String),
      });
      expect(result).toEqual(createdUser);
    });
  });

  describe('getUser', () => {
    it('should return a user if found', async () => {
      const username = 'testUser';
      const foundUser = {
        username: 'testUser',
        hashedPassword: 'hashedPassword',
      };

      mockUserModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(foundUser),
      });

      const result = await usersService.getUser(username);

      expect(result).toEqual(foundUser);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ username });
    });

    it('should return null if user not found', async () => {
      const username = 'nonExistingUser';

      mockUserModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const result = await usersService.getUser(username);

      expect(result).toBeNull();
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ username });
    });
  });

  describe('isUserRegistered', () => {
    it('should return true if user is registered', () => {
      const userDto: LoginDTO = { username: 'trailblazers', password: '12345' };
      const result = usersService.isUserRegistered(userDto);
      expect(result).toBe(true);
    });

    it('should return false if user is not registered', () => {
      const userDto: LoginDTO = {
        username: 'nonExistingUser',
        password: 'wrongPassword',
      };
      const result = usersService.isUserRegistered(userDto);
      expect(result).toBe(false);
    });
  });
});
