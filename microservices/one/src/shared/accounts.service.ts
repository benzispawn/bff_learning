import { Injectable } from '@nestjs/common';
import { AccountsStore, Account } from './accounts.store';

export class CreateAccountDto {
  id: string;
  name: string;
  balance: number;
  currency: string;
}

export class UpdateAccountDto {
  name?: string;
  balance?: number;
  currency?: string;
}

@Injectable()
export class AccountsService {
  constructor(private readonly store: AccountsStore) {}

  findAll(): Account[] {
    return this.store.findAll();
  }

  findOne(id: string): Account | undefined {
    return this.store.findOne(id);
  }

  create(dto: CreateAccountDto): Account {
    return this.store.create(dto);
  }

  update(id: string, dto: UpdateAccountDto): Account | undefined {
    return this.store.update(id, dto);
  }

  remove(id: string): boolean {
    return this.store.remove(id);
  }

  reset(): void {
    this.store.reset();
  }
}
