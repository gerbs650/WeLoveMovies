if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// needs to have a "/" route, app will not allow page to load.

// -- Not found handler --
app.use(notFound);

// -- Error Handler --
app.use(errorHandler);

module.exports = app;
