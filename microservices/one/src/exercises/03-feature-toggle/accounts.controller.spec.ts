import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController03 } from './accounts.controller';
import { AccountsService } from '../../shared/accounts.service';
import { AccountsStore } from '../../shared/accounts.store';
import { FeatureFlagGuard } from '../../shared/feature-flag.guard';

describe('AccountsController03', () => {
  let controller: AccountsController03;
  let previousFeatureFlags: string | undefined;

  beforeEach(() => {
    previousFeatureFlags = process.env.FEATURE_FLAGS;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController03],
      providers: [AccountsService, AccountsStore, FeatureFlagGuard, Reflector],
    }).compile();

    controller = module.get<AccountsController03>(AccountsController03);
  });

  afterEach(() => {
    if (previousFeatureFlags === undefined) {
      delete process.env.FEATURE_FLAGS;
      return;
    }

    process.env.FEATURE_FLAGS = previousFeatureFlags;
  });

  it('should return all accounts', () => {
    expect(controller.findAll()).toHaveLength(3);
  });

  it('should return premium message when flag is enabled', () => {
    process.env.FEATURE_FLAGS = 'premium';
    expect(controller.getPremium()).toEqual({ message: 'Premium access granted' });
  });
});
