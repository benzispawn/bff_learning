import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { HttpTwoModule } from '../../../repositories/http-two/http-two.module';
import { PresentationSchema } from './interfaces/presentation.schema';
import { ResearchSchema } from './interfaces/research.schema';
import { LearningTrailController } from './learning-trail.controller';
import {
  LearningTrailService,
  PRESENTATION_MODEL,
  RESEARCH_MODEL,
} from './services/learning-trail.service';

@Module({
  imports: [
    HttpTwoModule,
    MongooseModule.forFeature([
      { name: 'Presentation', schema: PresentationSchema },
      { name: 'Research', schema: ResearchSchema },
    ]),
  ],
  controllers: [LearningTrailController],
  providers: [
    LearningTrailService,
    {
      provide: PRESENTATION_MODEL,
      useFactory: (model: unknown) => model,
      inject: [getModelToken('Presentation')],
    },
    {
      provide: RESEARCH_MODEL,
      useFactory: (model: unknown) => model,
      inject: [getModelToken('Research')],
    },
  ],
})
export class LearningTrailModule {}
