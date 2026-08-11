import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AccountsController06 } from '../accounts.controller';
import { AccountsServiceE2E } from '../accounts.service';
import { HttpClientService } from '../../../core/http/http-client.service';

const mockHttpClientService: Pick<HttpClientService, 'get'> = {
  get: async () => ({
    accounts: [
      { id: 'acc-1', name: 'Primary' },
      { id: 'acc-2', name: 'Savings' },
    ],
  }),
};

@Module({
  controllers: [AccountsController06],
  providers: [
    AccountsServiceE2E,
    {
      provide: HttpClientService,
      useValue: mockHttpClientService,
    },
  ],
})
class TestModule {}

export async function bootstrapTestServer() {
  const app = await NestFactory.create(TestModule, new FastifyAdapter());
  await app.init();
  await app.getHttpAdapter().getInstance().ready();
  return app;
}
