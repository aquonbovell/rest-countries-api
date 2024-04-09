require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to the database!!");
    return client.db("countries").collection("Countries");
  } catch (error) {
    console.error(error);
    await client.close();
  }
}

module.exports = { connectDB };
