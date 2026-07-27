import { LearningTrailService } from './learning-trail.service';
import { NotificationDTO } from '../interfaces/notification.dto';
import { UpdateProfilePreferencesDTO } from '../interfaces/profile-preferences.dto';
import { FeatureFlag } from './feature-flag.decorator';
import { CacheService } from './cache.service';

describe('LearningTrailService', () => {
  let service: LearningTrailService;
  let httpTwoService: { get: jest.Mock; post: jest.Mock };
  let presentationModel: { findOne: jest.Mock; deleteMany: jest.Mock; insertMany: jest.Mock };
  let researchModel: { findOne: jest.Mock; deleteMany: jest.Mock; insertMany: jest.Mock };

  beforeEach(() => {
    httpTwoService = {
      get: jest.fn(),
      post: jest.fn(),
    };
    presentationModel = {
      findOne: jest.fn(),
      deleteMany: jest.fn(),
      insertMany: jest.fn(),
    };
    researchModel = {
      findOne: jest.fn(),
      deleteMany: jest.fn(),
      insertMany: jest.fn(),
    };

    service = new LearningTrailService(
      httpTwoService as any,
      presentationModel as any,
      researchModel as any,
    );
  });

  it('should return presentation data from seed and persist it', async () => {
    presentationModel.findOne.mockResolvedValue(null);
    httpTwoService.get.mockResolvedValue({ primaryText: 'Hello' });

    const result = await service.getPresentation();

    expect(result).toEqual({ primaryText: 'Hello' });
    expect(presentationModel.insertMany).toHaveBeenCalled();
  });

  it('should create a notification in memory', async () => {
    const dto: NotificationDTO = {
      message: 'New feature ready',
      type: 'info',
    };

    const result = await service.createNotification(dto);

    expect(result).toEqual(dto);
    expect(service.getNotifications()).toHaveLength(1);
  });

  it('should update profile preferences in memory', async () => {
    const dto: UpdateProfilePreferencesDTO = {
      theme: 'dark',
      language: 'pt-BR',
    };

    const result = await service.updateProfilePreferences(dto);

    expect(result).toEqual(dto);
    expect(service.getProfilePreferences()).toEqual(dto);
  });

  it('should aggregate presentation and research in a dashboard response', async () => {
    httpTwoService.get.mockResolvedValue({ primaryText: 'Hello' });
    researchModel.findOne.mockResolvedValue({ title: 'Research' });

    const result = await service.getDashboard();

    expect(result).toEqual({
      presentation: { primaryText: 'Hello' },
      research: { title: 'Research' },
    });
  });

  it('should use the recommended strategy for a risk level', async () => {
    const result = await service.getRecommendation('aggressive');

    expect(result).toMatchObject({ strategy: 'aggressive' });
  });

  it('should honor feature flags on decorated methods', async () => {
    process.env.FEATURE_FLAGS = 'learning-trail';

    class FeatureTarget {
      @FeatureFlag('learning-trail')
      public run() {
        return 'allowed';
      }
    }

    const target = new FeatureTarget();

    await expect(target.run()).resolves.toBe('allowed');
  });

  it('should cache values and invalidate them', async () => {
    const cacheService = new CacheService();
    const result = cacheService.getOrSet('demo', () => 'value', 30);

    expect(result).toBe('value');
    expect(cacheService.get('demo')).toBe('value');

    cacheService.invalidate('demo');
    expect(cacheService.get('demo')).toBeUndefined();
  });
});
