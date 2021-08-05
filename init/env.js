const crypto = require('crypto');
const fs = require('fs');

const envPath = '../.env';

const staticEnv = 'NODE_ENV=production\nJWT_SECRET=';

const JWT_SECRET = crypto.randomBytes(32).toString('hex');

const env = `${staticEnv}${JWT_SECRET}`;

async function upsertFile(name, valueIfNotFound) {
  const nameFromDirname = `${__dirname}/${name}`;
  try {
    await fs.promises.readFile(nameFromDirname);
  } catch (error) {
    await fs.promises.writeFile(nameFromDirname, valueIfNotFound);
  }
}

console.log('Initiating environment variables:');
console.log(env);

upsertFile(envPath, env);
