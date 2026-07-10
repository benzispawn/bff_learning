import { Module, OnModuleInit } from '@nestjs/common';
import { HomeController } from './home.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeService } from './home.service';
import { HomeSchema } from '../interfaces/home.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Home',
        useFactory: () => HomeSchema,
      },
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule implements OnModuleInit {
  constructor(private homeService: HomeService) {}

  onModuleInit() {
    void this.homeService.runMigrations();
  }
}
