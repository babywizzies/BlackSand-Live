// See https://www.mongodb.com/docs/atlas/best-practices-connecting-from-vercel/ for process to set up mongodb atlas connection with vercel deployment

"use strict";

// Import the mongodb dependency from nodejs install
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {

  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (hot module replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
    console.log("is global");
  }

  clientPromise = global._mongoClientPromise;
} else {

  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  console.log("is not global");
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
module.exports = clientPromise;



// Connect to ANDTHENEUM, full driver code
// const uri is connection String
// Replace <password> with the password for the w0nd3r user. Replace myFirstDatabase with the name of the database that connections will use by default. Ensure any option params are URL encoded.

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://w0nd3r:andtest@andtheneum.x8xg3.mongodb.net/ANDTHENEUM?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
