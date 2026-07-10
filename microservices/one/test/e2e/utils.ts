import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, RequestMethod } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AppModule } from '../../src/app.module';

export type E2eContext = {
  app: INestApplication;
  mongoServer: MongoMemoryServer;
};

export async function initE2e(): Promise<E2eContext> {
  const mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URL = mongoServer.getUri();
  process.env.JWT_SECRET_KEY = 'test-secret';

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication(new FastifyAdapter());
  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: '', method: RequestMethod.GET }],
  });
  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  return { app, mongoServer };
}

export async function closeE2e(context: Partial<E2eContext>): Promise<void> {
  if (context.app) {
    await context.app.close();
  }
  if (context.mongoServer) {
    await context.mongoServer.stop();
  }
}
