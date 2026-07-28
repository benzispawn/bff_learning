import { Controller, Delete, HttpCode, NotFoundException, Param } from '@nestjs/common';
import { AccountsService } from '../../shared/accounts.service';

@Controller('exercises/04/accounts')
export class AccountsController04 {
  constructor(private readonly accountsService: AccountsService) {}

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    const removed = this.accountsService.remove(id);
    if (!removed) {
      throw new NotFoundException('Account not found');
    }
    return;
  }

  /** @deprecated remove this dead code */
  legacyPath() {
    return { note: 'legacy' };
  }
}
