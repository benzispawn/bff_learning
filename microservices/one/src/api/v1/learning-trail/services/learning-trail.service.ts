import { Injectable, Inject } from '@nestjs/common';
import { HttpTwoService } from '../../../../repositories/http-two/services/http-two.service';
import { NotificationDTO } from '../interfaces/notification.dto';
import { UpdateProfilePreferencesDTO } from '../interfaces/profile-preferences.dto';
import { FeatureFlag } from './feature-flag.decorator';
import { CacheService } from './cache.service';

export const PRESENTATION_MODEL = 'PRESENTATION_MODEL';
export const RESEARCH_MODEL = 'RESEARCH_MODEL';

const presentationData = {
  primaryText: 'We are committed to building a multicultural, inclusive company.',
  carousel: [],
  buttonText: 'Continue',
};

interface RecommendationStrategy {
  name: string;
  execute(riskLevel: string): { strategy: string; riskLevel: string };
}

class ConservativeStrategy implements RecommendationStrategy {
  name = 'conservative';
  execute(riskLevel: string) {
    return { strategy: this.name, riskLevel };
  }
}

class ModerateStrategy implements RecommendationStrategy {
  name = 'moderate';
  execute(riskLevel: string) {
    return { strategy: this.name, riskLevel };
  }
}

class AggressiveStrategy implements RecommendationStrategy {
  name = 'aggressive';
  execute(riskLevel: string) {
    return { strategy: this.name, riskLevel };
  }
}

@Injectable()
export class LearningTrailService {
  private readonly notifications: NotificationDTO[] = [];
  private readonly profilePreferences: UpdateProfilePreferencesDTO = {};
  private readonly cacheService = new CacheService();

  constructor(
    private readonly httpTwoService: HttpTwoService,
    @Inject(PRESENTATION_MODEL)
    private readonly presentationModel: { findOne: Function; deleteMany: Function; insertMany: Function },
    @Inject(RESEARCH_MODEL)
    private readonly researchModel: { findOne: Function; deleteMany: Function; insertMany: Function },
  ) {}

  async getPresentation(): Promise<unknown> {
    await this.ensurePresentationSeed();
    return this.httpTwoService.get('/presentation');
  }

  async getResearch(): Promise<unknown> {
    return this.cacheService.getOrSet('research', async () => {
      const persistedResearch = await this.researchModel.findOne({});
      return persistedResearch ?? { title: 'Research' };
    }, 30);
  }

  async createNotification(dto: NotificationDTO): Promise<NotificationDTO> {
    this.notifications.push(dto);
    return dto;
  }

  getNotifications(): NotificationDTO[] {
    return this.notifications;
  }

  async updateProfilePreferences(dto: UpdateProfilePreferencesDTO): Promise<UpdateProfilePreferencesDTO> {
    Object.assign(this.profilePreferences, dto);
    return this.profilePreferences;
  }

  getProfilePreferences(): UpdateProfilePreferencesDTO {
    return this.profilePreferences;
  }

  async getDashboard(): Promise<{ presentation: unknown; research: unknown }> {
    const [presentation, research] = await Promise.all([
      this.getPresentation(),
      this.getResearch(),
    ]);

    return { presentation, research };
  }

  async getRecommendation(riskLevel: string): Promise<{ strategy: string; riskLevel: string }> {
    const strategy = this.resolveStrategy(riskLevel);
    return strategy.execute(riskLevel);
  }

  @FeatureFlag('learning-trail')
  async runFeatureProtected(): Promise<string> {
    return 'allowed';
  }

  private resolveStrategy(riskLevel: string): RecommendationStrategy {
    const strategyMap: Record<string, RecommendationStrategy> = {
      conservative: new ConservativeStrategy(),
      moderate: new ModerateStrategy(),
      aggressive: new AggressiveStrategy(),
    };

    return strategyMap[riskLevel] ?? new ModerateStrategy();
  }

  private async ensurePresentationSeed(): Promise<void> {
    const existing = await this.presentationModel.findOne({});
    if (!existing) {
      await this.presentationModel.insertMany([presentationData]);
    }
  }
}
