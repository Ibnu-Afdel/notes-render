const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const noteRouter = require("./controllers/notes");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
logger.info("connecting to ", config.MONGODO_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to mongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to mongoDB: ", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", noteRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
