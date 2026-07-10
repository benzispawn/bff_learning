import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initE2e, closeE2e, E2eContext } from './e2e/utils';

jest.setTimeout(30000);

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let context: E2eContext | null = null;

  beforeAll(async () => {
    context = await initE2e();
    app = context.app;
  });

  afterAll(async () => {
    await closeE2e(context ?? {});
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
