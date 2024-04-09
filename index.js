require("dotenv").config();
require("./database/connection");
const path = require("path");
const cors = require("cors");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const app = express();

//production
app.use(
  cors({
    origin: process.env.API_ORIGIN,
    credentials: true,
  })
);

//development
// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   })
// );

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/api", userRoutes);
app.use("/api", blogRoutes);

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send(err);
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});

module.exports = app;
