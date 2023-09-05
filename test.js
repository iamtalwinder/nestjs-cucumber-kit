const { MongoMemoryServer } = require('mongodb-memory-server');

async function test() {
  await MongoMemoryServer.create({ replSet: { count: 4 } })
}

test().then();
