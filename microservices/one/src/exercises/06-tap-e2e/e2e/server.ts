import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get, Injectable } from '@nestjs/common';
import { AccountsServiceE2E } from '../accounts.service';
import { HttpClientService } from '../../../core/http/http-client.service';

@Controller('accounts')
class TestController {
  @Get()
  get() {
    return { ok: true };
  }
}

@Module({
  controllers: [TestController],
  providers: [AccountsServiceE2E, HttpClientService],
})
class TestModule {}

export async function bootstrapTestServer() {
  const app = await NestFactory.create(TestModule);
  await app.listen(0);
  return app;
}
