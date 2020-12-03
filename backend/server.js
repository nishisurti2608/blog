//Packages from npm

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//fetching routes

const blogRoutes = require("../backend/routes/blog");
const authRoutes = require("../backend/routes/auth");
//Application using express (Invoking App)

const app = express();

//app using middle ware

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

//routes middle ware

app.use("/api", blogRoutes);
app.use("/api", authRoutes);

//Database

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })

  .then(() => console.log("Database Connected Successfully"));

//cors

if (process.env.NODE_ENV == "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//port

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is up to date and running on ${port}`);
});
