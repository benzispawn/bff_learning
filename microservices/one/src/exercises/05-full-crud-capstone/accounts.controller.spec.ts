import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController05 } from './accounts.controller';
import { AccountsService } from '../../shared/accounts.service';
import { AccountsStore } from '../../shared/accounts.store';

describe('AccountsController05', () => {
  let controller: AccountsController05;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController05],
      providers: [AccountsService, AccountsStore],
    }).compile();

    controller = module.get<AccountsController05>(AccountsController05);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
