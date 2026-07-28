import tap from 'tap';
import request from 'supertest';
import { bootstrapTestServer } from './server';

tap.test('e2e accounts endpoint', async (t) => {
  const app = await bootstrapTestServer();
  const response = await request(app.getHttpServer()).get('/accounts');

  t.equal(response.status, 200);
  t.same(response.body, { ok: true });

  await app.close();
});
