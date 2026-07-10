import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LoginController } from './login.controller';
import { LoginService } from './services/login.service';
import { UsersService } from './services/users.service';
import { UserSchema } from './interfaces/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [LoginController],
  providers: [LoginService, UsersService],
})
export class LoginModule {}
