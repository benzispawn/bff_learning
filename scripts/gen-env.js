const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const microservicesDir = path.join(repoRoot, 'microservices');

const IGNORE_DIRS = new Set(['node_modules', 'dist', '.git', 'test', 'tests']);
const FILE_EXTS = new Set(['.ts', '.js', '.mjs', '.cjs']);
const IGNORE_KEYS = new Set([]);

const SENSITIVE = /SECRET|TOKEN|PASSWORD|KEY/i;
const crypto = require('crypto');

function parseEnvExample(filePath) {
  if (!fs.existsSync(filePath)) {
    return { order: [], values: {} };
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const order = [];
  const values = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eqIndex = line.indexOf('=');
    if (eqIndex === -1) {
      continue;
    }
    const key = line.slice(0, eqIndex).trim();
    const value = line.slice(eqIndex + 1);
    if (!key) {
      continue;
    }
    if (!order.includes(key)) {
      order.push(key);
    }
    values[key] = value;
  }
  return { order, values };
}

function buildEnvFromExample(serviceDir) {
  const envExamplePath = path.join(serviceDir, '.env.example');
  const { order, values } = parseEnvExample(envExamplePath);
  return { keys: order, defaults: values };
}

function renderEnv(keys, defaults) {
  return (
    keys
      .map(key => {
        if (defaults[key] && !SENSITIVE.test(key)) {
          return `${key}=${defaults[key]}`;
        }
        if (SENSITIVE.test(key)) {
          return `${key}=${crypto.randomBytes(32).toString('base64')}`;
        }
        return `${key}=`;
      })
      .join('\n') + '\n'
  );
}

function main() {
  if (!fs.existsSync(microservicesDir)) {
    console.error('microservices directory not found.');
    process.exit(1);
  }

  const services = fs
    .readdirSync(microservicesDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  for (const service of services) {
    const serviceDir = path.join(microservicesDir, service);
    const { keys, defaults } = buildEnvFromExample(serviceDir);

    const envPath = path.join(serviceDir, '.env');
    fs.writeFileSync(envPath, renderEnv(keys, defaults), 'utf8');
  }
}

main();
