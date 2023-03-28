const express = require("express");
var cors = require("cors");
const app = express();
const routes = require("./routes/v1");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
require("./models");
require("dotenv").config();

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//static image folder
// app.use("/Images", express.static("Images"));

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/v1", routes);

// main route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.all("*", (req, res) => {
  res.send("No route found");
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});

// listening server
app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);
