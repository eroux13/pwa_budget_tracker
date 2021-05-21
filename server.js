const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const chalk = require("chalk");

// Update PORT for Heroku deployment
const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Update connection for MongoDB Atlas and Heroku
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false,
  // useUnifiedTopology: true,
  // useCreateIndex: true
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(chalk.bold.green(`App running on port ${PORT}!`));
});