require("dotenv/config");

const { connectDB } = require("./db/connect");
const Country = require("./models/country");

const CountriesData = require("./data.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Country.deleteMany();
    await Country.create(CountriesData, { validateBeforeSave: true });
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
