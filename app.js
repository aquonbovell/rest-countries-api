require("dotenv/config");
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Express
const express = require("express");
const app = express();

const { connectDB } = require("./db/connect");

// Routers
const router = require("./routes/countries");

// Error Handler
const errorHandler = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 75, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/", router);

app.use(errorHandler);

const PORT = process.env.PORT || 6000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
