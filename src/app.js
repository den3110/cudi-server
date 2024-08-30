/* eslint-disable no-console */
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

class App {
  constructor() {
    this.app = express();
    this.config();
    this.connectDatabase();
    this.routes();
    this.errorHandling();
  }

  config() {
    // handle CORS error
    this.app.use(cors());

    // load environment variables
    dotenv.config();

    // make use of morgan for logging
    this.app.use(logger("dev"));

    // allow collection of payload from body
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  connectDatabase() {
    const { DB_URI } = process.env;

    // connect to MongoDB database
    mongoose
      .connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => console.log("MongoDB database connected!"))
      .catch((err) => console.log(err));
  }

  routes() {
    // set up routes here
    const router = require("./routes/index");

    this.app.get("/", (req, res) =>
      res.status(200).json({
        status: true,
        message: "Server running",
      })
    );

    // routers
    this.app.use("/api/v1", router);
  }

  errorHandling() {
    // catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      next(createError(404));
    });

    // error handler
    this.app.use((err, req, res, next) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 400);
      res.json({ error: err.message, message: "Operation failed" });
    });
  }

  getInstance() {
    return this.app;
  }
}

module.exports = new App().getInstance();
