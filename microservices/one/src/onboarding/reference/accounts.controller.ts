import { Controller, Get, Param } from '@nestjs/common';
import { AccountsService } from '../../shared/accounts.service';

@Controller('onboarding/reference/accounts')
export class ReferenceAccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }
}
