import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { LoginModule } from './login.module';
import { LoginController } from './login.controller';
import { LoginService } from './services/login.service';

jest.mock('@nestjs/jwt', () => ({
  JwtModule: {
    register: jest.fn().mockReturnValue({
      module: class MockJwtModule {},
    }),
  },
}));

jest.mock('../../../common/helpers/get-required-env', () => ({
  getRequiredEnv: jest.fn(() => 'mocked-jwt-secret'),
}));

jest.mock('./services/users.service', () => ({
  UsersService: class MockUserService {},
}));

// Mock InjectModel decorator
jest.mock('@nestjs/mongoose', () => ({
  MongooseModule: {
    forFeature: jest.fn().mockReturnValue({
      module: class MockMongooseModule {},
      providers: [],
    }),
  },
  InjectModel: () => jest.fn(),
  getModelToken: jest.fn().mockReturnValue('User'),
}));

// Mock Model
const mockModel = {
  new: jest.fn().mockResolvedValue({}),
  constructor: jest.fn().mockResolvedValue({}),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
  remove: jest.fn(),
  exec: jest.fn(),
};

describe('LoginModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    const moduleRef = Test.createTestingModule({
      imports: [LoginModule],
    })
      .overrideProvider(getModelToken('User'))
      .useValue(mockModel);

    module = await moduleRef.compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have LoginController', () => {
    const controller = module.get<LoginController>(LoginController);
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(LoginController);
  });

  it('should have LoginService', () => {
    const service = module.get<LoginService>(LoginService);
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(LoginService);
  });
});

// Mocking dependencies to avoid actual instantiation
jest.mock('./login.controller');
jest.mock('./services/login.service');
jest.mock('./interfaces/user.schema', () => ({
  UserSchema: {},
}));
