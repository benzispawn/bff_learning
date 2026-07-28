import { Test, TestingModule } from '@nestjs/testing';
import { LearningTrailController } from './learning-trail.controller';
import { LearningTrailService } from './services/learning-trail.service';

describe('LearningTrailController', () => {
  let controller: LearningTrailController;
  let service: { getPresentation: jest.Mock; getResearch: jest.Mock; getDashboard: jest.Mock; createNotification: jest.Mock; getProfilePreferences: jest.Mock; updateProfilePreferences: jest.Mock; getRecommendation: jest.Mock };

  beforeEach(async () => {
    service = {
      getPresentation: jest.fn(),
      getResearch: jest.fn(),
      getDashboard: jest.fn(),
      createNotification: jest.fn(),
      getProfilePreferences: jest.fn(),
      updateProfilePreferences: jest.fn(),
      getRecommendation: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningTrailController],
      providers: [
        {
          provide: LearningTrailService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<LearningTrailController>(LearningTrailController);
  });

  it('should return presentation data', async () => {
    service.getPresentation.mockResolvedValue({ primaryText: 'Hello' });
    await expect(controller.getPresentation()).resolves.toEqual({ primaryText: 'Hello' });
  });

  it('should return dashboard data', async () => {
    service.getDashboard.mockResolvedValue({ presentation: {}, research: {} });
    await expect(controller.getDashboard()).resolves.toEqual({ presentation: {}, research: {} });
  });

  it('should return profile preferences from the service', async () => {
    service.getProfilePreferences.mockResolvedValue({ theme: 'dark', language: 'pt-BR' });

    await expect(controller.getProfilePreferences()).resolves.toEqual({ theme: 'dark', language: 'pt-BR' });
  });
});
