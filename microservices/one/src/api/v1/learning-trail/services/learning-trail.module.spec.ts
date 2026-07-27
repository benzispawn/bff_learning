import { Test, TestingModule } from '@nestjs/testing';
import { LearningTrailModule } from '../learning-trail.module';

describe('LearningTrailModule', () => {
  it('should be defined', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LearningTrailModule],
    }).compile();

    expect(module).toBeDefined();
  });
});
