import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { getRequiredEnv } from './common/helpers/get-required-env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './api/v1/login/login.module';
import { HomeModule } from './api/v1/home/home.module';
import { LearningTrailModule } from './api/v1/learning-trail/learning-trail.module';

const mongoUrl = getRequiredEnv('MONGO_URL');

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(mongoUrl),
    JwtModule.register({
      global: true,
      secret: getRequiredEnv('JWT_SECRET_KEY'),
      signOptions: { expiresIn: '1y' },
    }),
    LoginModule,
    HomeModule,
    LearningTrailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
