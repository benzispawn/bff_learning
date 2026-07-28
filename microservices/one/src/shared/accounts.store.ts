export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
}

export class AccountsStore {
  private readonly accounts: Account[] = [
    { id: '1', name: 'Primary', balance: 100, currency: 'USD' },
    { id: '2', name: 'Savings', balance: 250, currency: 'USD' },
    { id: '3', name: 'Travel', balance: 75, currency: 'EUR' },
  ];

  findAll(): Account[] {
    return this.accounts.map((account) => ({ ...account }));
  }

  findOne(id: string): Account | undefined {
    return this.accounts.find((account) => account.id === id);
  }

  create(account: Account): Account {
    this.accounts.push(account);
    return { ...account };
  }

  update(id: string, account: Partial<Account>): Account | undefined {
    const target = this.accounts.find((item) => item.id === id);
    if (!target) {
      return undefined;
    }

    Object.assign(target, account);
    return { ...target };
  }

  remove(id: string): boolean {
    const index = this.accounts.findIndex((account) => account.id === id);
    if (index < 0) {
      return false;
    }

    this.accounts.splice(index, 1);
    return true;
  }

  reset(): void {
    this.accounts.splice(0, this.accounts.length, ...[
      { id: '1', name: 'Primary', balance: 100, currency: 'USD' },
      { id: '2', name: 'Savings', balance: 250, currency: 'USD' },
      { id: '3', name: 'Travel', balance: 75, currency: 'EUR' },
    ]);
  }
}
