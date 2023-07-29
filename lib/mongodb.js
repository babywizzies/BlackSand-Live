import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// Check the MongoDB URI

//
// Check the MongoDB DB



let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // check the cache
  if (cachedClient && cachedDb) {
    // load from cached
    return {
      client: cachedClient,
      db: cachedDb
    };
  }

  // set the connection options
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // connect to cluster
  let client = new MongoClient(MONGODB_URI, options);
  await client.connect();
  let db = client.db(MONGODB_DB);
  // global.db = client.db(MONGODB_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
