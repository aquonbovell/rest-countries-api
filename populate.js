const { connectDB } = require("./db/connect");

const data = require("./data.json");

const start = async () => {
  try {
    const client = await connectDB();
    await client.deleteMany({});
    await client.insertMany(data);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
