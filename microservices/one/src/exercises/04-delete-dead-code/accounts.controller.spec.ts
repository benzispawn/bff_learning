import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController04 } from './accounts.controller';
import { AccountsService } from '../../shared/accounts.service';
import { AccountsStore } from '../../shared/accounts.store';

describe('AccountsController04', () => {
  let controller: AccountsController04;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController04],
      providers: [AccountsService, AccountsStore],
    }).compile();

    controller = module.get<AccountsController04>(AccountsController04);
  });

  it('should remove an existing account', () => {
    expect(() => controller.remove('1')).not.toThrow();
  });

  it('should throw for unknown account', () => {
    expect(() => controller.remove('999')).toThrow('Account not found');
  });
});
