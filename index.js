const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const viewCount = require("./middleware/viewCount");
const dbConnect = require("./utils/dbConnect");
const toolRoutes = require("./utils/routes/v1/tool.route");
const usersRoutes = require("./utils/routes/v1/users.route");
const errorHandler = require("./middleware/errorHandler");

app.use(cors()); 
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
// app.use(cors({origin: 'https://x-computer-manufacture.web.app/'})
// app.use(viewCount)

// Apply the rate limiting middleware to all requests
// app.use(limiter)

dbConnect();

app.use("/api/v1/tool", toolRoutes);
app.use("/api/v1/users", usersRoutes);
app.get("/", (req, res) => {
  // res.send("Hello World!");
  // res.sendFile(__dirname + "/public/test.html");b
  res.render("home.ejs", {
    id: 2,
    user: {
      name: "test",
    },
  });
});

app.all("*", (req, res) => {
  res.send("No route found");
});

app.use(errorHandler);

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("dbConnected");
});
  