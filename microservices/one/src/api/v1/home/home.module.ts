import { Module } from '@nestjs/common';

import { HttpTwoModule } from '../../../repositories/http-two/http-two.module';

import { HomeController } from './home.controller';
import { HomeService } from './services/home.service';

@Module({
  imports: [HttpTwoModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
