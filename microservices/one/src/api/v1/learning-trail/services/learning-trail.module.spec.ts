import { Test, TestingModule } from '@nestjs/testing';
import { LearningTrailModule } from '../learning-trail.module';
import {
  PRESENTATION_MODEL,
  RESEARCH_MODEL,
} from './learning-trail.service';

jest.mock('@nestjs/mongoose', () => ({
  MongooseModule: {
    forFeature: jest.fn().mockReturnValue({
      module: class MockMongooseFeatureModule {},
    }),
  },
  getModelToken: jest.fn((name: string) => `${name}Model`),
}));

describe('LearningTrailModule', () => {
  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LearningTrailModule],
    })
      .overrideProvider(PRESENTATION_MODEL)
      .useValue({})
      .overrideProvider(RESEARCH_MODEL)
      .useValue({})
      .compile();

    expect(module).toBeDefined();
  });
});
