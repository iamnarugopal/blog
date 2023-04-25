require("dotenv").config();
require("./database/connection");
const path = require("path");
const cors = require("cors");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: process.env.API_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", userRoutes);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

app.get('/', (req, res) => {
  const token = req.cookies.token;
  res.send(`The value of myCookie is ${token}`);
});


// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});

module.exports = app;
