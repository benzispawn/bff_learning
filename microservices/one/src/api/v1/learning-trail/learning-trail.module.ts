import { Module } from '@nestjs/common';
import { HttpTwoModule } from '../../../repositories/http-two/http-two.module';
import { LearningTrailController } from './learning-trail.controller';
import {
  LearningTrailService,
  PRESENTATION_MODEL,
  RESEARCH_MODEL,
} from './services/learning-trail.service';

const mockPresentationModel = {
  findOne: async () => null,
  deleteMany: async () => undefined,
  insertMany: async () => undefined,
};

const mockResearchModel = {
  findOne: async () => ({ title: 'Research' }),
  deleteMany: async () => undefined,
  insertMany: async () => undefined,
};

@Module({
  imports: [HttpTwoModule],
  controllers: [LearningTrailController],
  providers: [
    LearningTrailService,
    {
      provide: PRESENTATION_MODEL,
      useValue: mockPresentationModel,
    },
    {
      provide: RESEARCH_MODEL,
      useValue: mockResearchModel,
    },
  ],
})
export class LearningTrailModule {}
