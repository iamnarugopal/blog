require("dotenv").config();
require("./database/connection");
const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("api/user", userRoutes);


app.get("/", (req, res) => {
  res.status(200).json({ status: 1, message: "Blog Api" });
});

app.listen(PORT, () => {
  console.log(`Server is listing on http://localhost:${PORT}/`);
});

module.exports = app;
