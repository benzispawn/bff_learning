import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { homeSwaggerDoc } from './controller.docs';
import { HomeService } from './services/home.service';
import { AuthGuard } from '../../../common/guards/auth.guard';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @ApiResponse(homeSwaggerDoc)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('')
  async getHome() {
    return await this.homeService.getHome();
  }
}
