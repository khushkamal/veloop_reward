const mongoose = require('mongoose');
const os = require('os');

// Ensure writable temp directory for serverless environments (e.g. Vercel, AWS Lambda)
const tmpDir = os.tmpdir() || '/tmp';
process.env.HOME = tmpDir;
process.env.MONGOMS_DOWNLOAD_DIR = tmpDir;
process.env.MONGOMS_CACHE_DIR = tmpDir;

let mongod = null;
let connectionPromise = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    const rawUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    const uri = rawUri ? rawUri.trim().replace(/^["']|["']$/g, '') : null;

    if (uri) {
      try {
        await mongoose.connect(uri, {
          serverSelectionTimeoutMS: 5000
        });
        console.log(`[MongoDB] Connected to external MongoDB: ${mongoose.connection.host}`);
        return mongoose.connection;
      } catch (err) {
        console.warn(`[MongoDB] Could not connect to external MongoDB URI (${err.message}). Falling back to in-memory instance...`);
      }
    }

    // In-memory fallback with serverless temp directory support
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongod = await MongoMemoryServer.create({
        instance: {
          dbName: 'veloop_rewards'
        }
      });
      const memUri = mongod.getUri();
      await mongoose.connect(memUri);
      console.log(`[MongoDB] Connected to in-memory MongoDB instance: ${memUri}`);
      return mongoose.connection;
    } catch (memErr) {
      console.error(`[MongoDB] Failed to start in-memory MongoDB:`, memErr);
      connectionPromise = null;
      throw memErr;
    }
  })();

  return connectionPromise;
}

async function closeDB() {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
}

module.exports = { connectDB, closeDB };
