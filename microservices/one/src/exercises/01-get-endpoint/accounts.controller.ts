import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { AccountsService } from '../../shared/accounts.service';

@Controller('exercises/01/accounts')
export class AccountsController01 {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const account = this.accountsService.findOne(id);
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }
}
