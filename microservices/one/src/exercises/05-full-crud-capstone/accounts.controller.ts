import { Controller } from '@nestjs/common';
import { AccountsService } from '../../shared/accounts.service';

@Controller('exercises/05/accounts')
export class AccountsController05 {
  constructor(private readonly accountsService: AccountsService) {}
}
