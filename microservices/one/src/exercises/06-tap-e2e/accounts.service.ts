import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../core/http/http-client.service';

@Injectable()
export class AccountsServiceE2E {
  constructor(private readonly httpClientService: HttpClientService) {}

  async getAccounts() {
    return this.httpClientService.get('https://example.test/accounts');
  }
}
