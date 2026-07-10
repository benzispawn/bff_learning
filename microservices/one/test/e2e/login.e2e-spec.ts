import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { initE2e, closeE2e, E2eContext } from './utils';

jest.setTimeout(30000);

describe('Login E2E (happy path)', () => {
  let app: INestApplication;
  let context: E2eContext | null = null;

  beforeAll(async () => {
    context = await initE2e();
    app = context.app;
  });

  afterAll(async () => {
    await closeE2e(context ?? {});
  });

  it('POST /api/v1/login', async () => {
    const fixturePath = join(__dirname, '..', 'fixtures', 'login.json');
    const fixture = JSON.parse(readFileSync(fixturePath, 'utf8'));
    const payload = fixture.request.body;

    const response = await request(app.getHttpServer())
      .post(fixture.request.path)
      .send(payload)
      .set(fixture.request.headers ?? {});

    expect([200, 201]).toContain(response.status);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('username', payload.username);

    const sanitizedBody = { ...response.body };
    delete sanitizedBody.accessToken;
    delete sanitizedBody._id;
    delete sanitizedBody.password;

    expect({ status: 200, body: sanitizedBody }).toEqual(fixture.response);
    expect({ status: 200, body: sanitizedBody }).toMatchSnapshot();
  });
});
