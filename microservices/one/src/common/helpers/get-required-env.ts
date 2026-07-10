export function getRequiredEnv(envKey: string) {
  let value = process.env[envKey];

  if (!value) {
    //throw new Error(`${envKey} not found in your .env file`);
    console.log(`${envKey} not found in your .env file, ussing dummy value`);
    value = 'dummyValue';
  }

  return value;
}
