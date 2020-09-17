const express = require("express");
const app = express();
const cors = require("cors");
const datetimefetch = require("./datetimefetch.js");
const victimdatafetch = require("./victimdatafetch.js");
const detail = require("./detail");

app.use(express.json());
app.use(cors());

app.all("/", (req, res) => {
  res.send("hello world!");
});

app.use("/api", datetimefetch);
app.use("/api", victimdatafetch);
app.use("/api", detail);

let port = 5000;

app.listen((PORT = process.env.PORT || port));
console.log("server started...");
