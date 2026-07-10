import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../interfaces/user.interface';
import { LoginDTO } from '../interfaces/login.dto';

@Injectable()
export class UsersService {
  private readonly passwords = { trailblazers: '12345' };

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async saveUser(user: LoginDTO): Promise<UserDocument> {
    await this.userModel.deleteMany().exec();
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await this.userModel.create({
      username: user.username,
      hashedPassword,
    });

    return createdUser;
  }

  async getUser(username: string): Promise<UserDocument> {
    return await this.userModel.findOne({ username }).exec();
  }

  isUserRegistered(user: LoginDTO): boolean {
    return this.passwords[user.username] === user.password;
  }
}
