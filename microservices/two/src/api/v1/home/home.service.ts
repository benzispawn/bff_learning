import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HomeDocument } from '../interfaces/home.interface';
import { homeData } from '../initialData/home-data';

@Injectable()
export class HomeService {
  constructor(
    @InjectModel('Home')
    private readonly homeModel: Model<HomeDocument>,
  ) {}

  async getHome(): Promise<HomeDocument> {
    return await this.homeModel.findOne({}, { _id: 0, __v: 0 });
  }

  async runMigrations() {
    try {
      await this.migration0();
    } catch (e) {
      console.error(e);
    }
  }

  async migration0() {
    try {
      await this.homeModel.deleteMany();
      await this.homeModel.insertMany([homeData]);
    } catch (e) {
      console.error(e);
    }
  }
}
