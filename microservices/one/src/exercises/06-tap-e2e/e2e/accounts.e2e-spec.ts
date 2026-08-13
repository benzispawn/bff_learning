import tap from 'tap';
const request = require('supertest');
import { bootstrapTestServer } from './server';

tap.test('e2e accounts endpoint', async (t) => {
  const app = await bootstrapTestServer();
  t.teardown(async () => {
    await app.close();
  });

  const response = await request(app.getHttpServer()).get('/exercises/06/accounts');

  t.equal(response.status, 200);
  t.same(response.body, {
    accounts: [
      { id: 'acc-1', name: 'Primary' },
      { id: 'acc-2', name: 'Savings' },
    ],
  });
});

tap.test('e2e accounts endpoint returns 500 when the outbound dependency fails', async (t) => {
  const app = await bootstrapTestServer({
    get: async () => {
      throw new Error('upstream failed');
    },
  });

  t.teardown(async () => {
    await app.close();
  });

  const response = await request(app.getHttpServer()).get('/exercises/06/accounts');

  t.equal(response.status, 500);
});
