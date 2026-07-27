import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
} from '@nestjs/common';
import { LearningTrailService } from './services/learning-trail.service';
import { NotificationDTO } from './interfaces/notification.dto';
import { UpdateProfilePreferencesDTO } from './interfaces/profile-preferences.dto';

@Controller('learning-trail')
export class LearningTrailController {
  constructor(private readonly learningTrailService: LearningTrailService) {}

  @Get('presentation')
  async getPresentation() {
    return this.learningTrailService.getPresentation();
  }

  @Get('research')
  async getResearch() {
    return this.learningTrailService.getResearch();
  }

  @Get('dashboard')
  async getDashboard() {
    return this.learningTrailService.getDashboard();
  }

  @Post('notification')
  async createNotification(@Body() dto: NotificationDTO) {
    return this.learningTrailService.createNotification(dto);
  }

  @Patch('profile/preferences')
  async updateProfilePreferences(@Body() dto: UpdateProfilePreferencesDTO) {
    return this.learningTrailService.updateProfilePreferences(dto);
  }

  @Get('recommendation/:riskLevel')
  async getRecommendation(@Param('riskLevel') riskLevel: string) {
    return this.learningTrailService.getRecommendation(riskLevel);
  }
}
