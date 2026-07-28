import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController01 } from './accounts.controller';
import { AccountsService } from '../../shared/accounts.service';
import { AccountsStore } from '../../shared/accounts.store';

describe('AccountsController01', () => {
  let controller: AccountsController01;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController01],
      providers: [AccountsService, AccountsStore],
    }).compile();

    controller = module.get<AccountsController01>(AccountsController01);
  });

  it('should return all accounts', () => {
    expect(controller.findAll()).toHaveLength(3);
  });

  it('should return one account', () => {
    expect(controller.findOne('1')).toMatchObject({ id: '1' });
  });

  it('should throw for unknown account', () => {
    expect(() => controller.findOne('999')).toThrow('Account not found');
  });
});
