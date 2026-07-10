import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { getRequiredEnv } from './common/helpers/get-required-env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './api/v1/login/login.module';
import { HomeModule } from './api/v1/home/home.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    JwtModule.register({
      global: true,
      secret: getRequiredEnv('JWT_SECRET_KEY'),
      signOptions: { expiresIn: '1y' },
    }),
    LoginModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
