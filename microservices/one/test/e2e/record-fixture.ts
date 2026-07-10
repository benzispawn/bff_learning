import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as request from 'supertest';
import { initE2e, closeE2e } from './utils';

type FixtureRequest = {
  method: string;
  path: string;
  headers?: Record<string, string>;
  body?: unknown;
};

type Fixture = {
  request: FixtureRequest;
  response?: {
    status: number;
    body: Record<string, unknown>;
  };
};

function getFixtureName(): string {
  const arg = process.argv[2];
  if (arg) {
    return arg.replace(/\.json$/, '');
  }
  return process.env.FIXTURE ?? 'login';
}

async function main() {
  const context = await initE2e();

  try {
    const fixtureName = getFixtureName();
    const fixturePath = join(
      __dirname,
      '..',
      'fixtures',
      `${fixtureName}.json`,
    );
    const fixture = JSON.parse(readFileSync(fixturePath, 'utf8')) as Fixture;

    const method = fixture.request.method.toLowerCase();
    const req = request(context.app.getHttpServer())[method](
      fixture.request.path,
    );
    const response = await req
      .set(fixture.request.headers ?? {})
      .send(fixture.request.body ?? {});

    const sanitizedBody = { ...response.body };
    delete sanitizedBody.accessToken;
    delete sanitizedBody._id;
    delete sanitizedBody.password;

    const updatedFixture: Fixture = {
      request: fixture.request,
      response: {
        status: response.status,
        body: sanitizedBody,
      },
    };

    writeFileSync(
      fixturePath,
      JSON.stringify(updatedFixture, null, 2) + '\n',
      'utf8',
    );
  } finally {
    await closeE2e(context);
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
