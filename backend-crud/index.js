require("express-async-errors");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const users = require("./routes/users");
const app = express();

mongoose
  .connect("mongodb://localhost/bookapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("Connected to MongoDB..");
  })
  .catch((err) => console.error("Could not connect to MongoDB..", err.message));

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.use("/api/users", users);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
