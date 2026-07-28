import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController02 } from './accounts.controller';
import { AccountsService } from '../../shared/accounts.service';
import { AccountsStore } from '../../shared/accounts.store';

describe('AccountsController02', () => {
  let controller: AccountsController02;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController02],
      providers: [AccountsService, AccountsStore],
    }).compile();

    controller = module.get<AccountsController02>(AccountsController02);
  });

  it('should create an account', () => {
    const result = controller.create({ id: '4', name: 'New', balance: 10, currency: 'USD' });
    expect(result).toMatchObject({ id: '4' });
  });

  it('should update an account', () => {
    const result = controller.update('1', { name: 'Updated' });
    expect(result).toMatchObject({ name: 'Updated' });
  });
});
