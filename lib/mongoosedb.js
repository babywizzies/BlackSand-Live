import mongoose from "mongoose";
// import { Avatar, Content, Draft } from "../utils/models";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// Check the MongoDB URI


let clientPromise;

;(async () => {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (hot module replacement).
    if (!global._mongooseClientPromise) {
      global._mongooseClientPromise = await mongoose.connect(MONGODB_URI);
      console.log("is global");
    }

    clientPromise = global._mongooseClientPromise;
  }  else {
    // In production mode, it's best to not use a global variable.
    clientPromise = await mongoose.connect(MONGODB_URI);
    console.log("is not global");
  }
})()


// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
module.exports = clientPromise;
