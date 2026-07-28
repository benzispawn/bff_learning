import { Body, Controller, HttpCode, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { AccountsService, CreateAccountDto, UpdateAccountDto } from '../../shared/accounts.service';

@Controller('exercises/02/accounts')
export class AccountsController02 {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateAccountDto) {
    return this.accountsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAccountDto) {
    const account = this.accountsService.update(id, dto);
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }
}
