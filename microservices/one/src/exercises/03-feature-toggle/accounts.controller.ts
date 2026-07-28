import { Controller, Get, UseGuards } from '@nestjs/common';
import { FeatureFlag, FeatureFlagGuard } from '../../shared/feature-flag.guard';
import { AccountsService } from '../../shared/accounts.service';

@Controller('exercises/03/accounts')
export class AccountsController03 {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get('premium')
  @UseGuards(FeatureFlagGuard)
  @FeatureFlag('premium')
  getPremium() {
    return { message: 'Premium access granted' };
  }
}
