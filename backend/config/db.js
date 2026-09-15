const mongoose = require('mongoose');

let mongod = null;

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (uri) {
    try {
      await mongoose.connect(uri);
      console.log(`[MongoDB] Connected to external MongoDB: ${mongoose.connection.host}`);
      return;
    } catch (err) {
      console.warn(`[MongoDB] Could not connect to external MONGODB_URI (${err.message}). Falling back to in-memory instance...`);
    }
  }

  // In-memory fallback
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongod = await MongoMemoryServer.create();
    const memUri = mongod.getUri();
    await mongoose.connect(memUri);
    console.log(`[MongoDB] Connected to in-memory MongoDB instance: ${memUri}`);
  } catch (memErr) {
    console.error(`[MongoDB] Failed to start in-memory MongoDB:`, memErr);
    throw memErr;
  }
}

async function closeDB() {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
}

module.exports = { connectDB, closeDB };
