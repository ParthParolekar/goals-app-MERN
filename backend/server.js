const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.listen(port);

app.use("/api/goals", require("./routes/goalRoutes"));
