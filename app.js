require("dotenv/config");
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const sawggerDocument = YAML.load("./swagger.yaml");

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

app.get("/", (req, res, next) => {
  res.redirect(302, "/api-docs");
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(sawggerDocument));

app.use("/api/countries", router);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
