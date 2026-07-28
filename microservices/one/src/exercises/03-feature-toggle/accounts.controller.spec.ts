import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController03 } from './accounts.controller';
import { AccountsService } from '../../shared/accounts.service';
import { AccountsStore } from '../../shared/accounts.store';
import { FeatureFlagGuard } from '../../shared/feature-flag.guard';

describe('AccountsController03', () => {
  let controller: AccountsController03;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController03],
      providers: [AccountsService, AccountsStore, FeatureFlagGuard, Reflector],
    }).compile();

    controller = module.get<AccountsController03>(AccountsController03);
  });

  it('should return all accounts', () => {
    expect(controller.findAll()).toHaveLength(3);
  });

  it('should return premium message when flag is enabled', () => {
    process.env.FEATURE_FLAGS = 'premium';
    expect(controller.getPremium()).toEqual({ message: 'Premium access granted' });
  });
});
