import { Injectable } from '@nestjs/common';

import { HttpTwoService } from '../../../../repositories/http-two/services/http-two.service';

@Injectable()
export class HomeService {
  constructor(private readonly httpTwoService: HttpTwoService) {}

  async getHome(): Promise<unknown> {
    return this.httpTwoService.get('/home');
  }
}
