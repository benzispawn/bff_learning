import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './api/v1/login/login.module';
import { HomeModule } from './api/v1/home/home.module';
import { LearningTrailModule } from './api/v1/learning-trail/learning-trail.module';

jest.mock('@nestjs/config', () => ({
  ConfigModule: {
    forRoot: jest.fn().mockReturnValue({
      module: class MockConfigModule {},
    }),
  },
}));

jest.mock('@nestjs/mongoose', () => ({
  MongooseModule: {
    forRoot: jest.fn().mockReturnValue({
      module: class MockMongooseModule {},
    }),
    forFeature: jest.fn().mockReturnValue({
      module: class MockMongooseFeatureModule {},
    }),
  },
  getModelToken: jest.fn(),
}));

jest.mock('@nestjs/jwt', () => ({
  JwtModule: {
    register: jest.fn().mockReturnValue({
      module: class MockJwtModule {},
    }),
  },
}));

jest.mock('./common/helpers/get-required-env', () => ({
  getRequiredEnv: jest.fn((key: string) => {
    if (key === 'MONGO_URL') {
      return 'mongodb://localhost:27017/test-db';
    }

    return 'mocked-jwt-secret';
  }),
}));

// Mock the other modules
jest.mock('./api/v1/login/login.module', () => ({
  LoginModule: class MockLoginModule {},
}));

jest.mock('./api/v1/home/home.module', () => ({
  HomeModule: class MockHomeModule {},
}));

jest.mock('./api/v1/learning-trail/learning-trail.module', () => ({
  LearningTrailModule: class MockLearningTrailModule {},
}));

describe('AppModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getModelToken('User'))
      .useValue({
        find: jest.fn(),
        findOne: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndRemove: jest.fn(),
        save: jest.fn(),
      })
      .compile();
  }, 30000);

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should import ConfigModule', () => {
    expect(ConfigModule.forRoot).toHaveBeenCalled();
  });

  it('should import MongooseModule with correct connection string', () => {
    expect(MongooseModule.forRoot).toHaveBeenCalledWith(
      'mongodb://localhost:27017/test-db',
    );
  });

  it('should import JwtModule with correct configuration', () => {
    expect(JwtModule.register).toHaveBeenCalledWith({
      global: true,
      secret: 'mocked-jwt-secret',
      signOptions: { expiresIn: '1y' },
    });
  });

  it('should import LoginModule', () => {
    const loginModule = module.get(LoginModule);
    expect(loginModule).toBeDefined();
  });

  it('should import HomeModule', () => {
    const homeModule = module.get(HomeModule);
    expect(homeModule).toBeDefined();
  });

  it('should import LearningTrailModule', () => {
    const learningTrailModule = module.get(LearningTrailModule);
    expect(learningTrailModule).toBeDefined();
  });

  it('should have AppController', () => {
    const appController = module.get(AppController);
    expect(appController).toBeDefined();
  });

  it('should have AppService', () => {
    const appService = module.get(AppService);
    expect(appService).toBeDefined();
  });
});
