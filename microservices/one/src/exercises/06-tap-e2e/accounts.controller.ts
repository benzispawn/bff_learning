import { Controller, Get } from '@nestjs/common';
import { AccountsServiceE2E } from './accounts.service';

@Controller('exercises/06/accounts')
export class AccountsController06 {
  constructor(private readonly accountsService: AccountsServiceE2E) {}

  @Get()
  async findAll() {
    return this.accountsService.getAccounts();
  }
}
