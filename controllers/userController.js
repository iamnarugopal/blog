const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const body = req.body;
    if (Object.keys(body).length === 0) {
      res.status(200).json({ message: "Blank detail can't save", status: 0 });
      return;
    }
    const userExist = await User.findOne({ email: body.email });
    if (!!userExist) {
      res.status(409).json({ message: "User already exist", status: 0 });
      return;
    }
    const hashPassword = await bcrypt.hash(body.password, 10);
    const result = new User({
      name: body.name,
      email: body.email,
      password: hashPassword,
    });
    result
      .save()
      .then(() =>
        res.status(201).json({ message: "User saved successfully", status: 1 })
      )
      .catch((e) => res.status(200).json({ message: e.message, status: 0 }));
  } catch (e) {
    res.status(500).json({ message: e.message, status: 0 });
  }
};

module.exports.login = async (req, res) => {
  try {
    const body = req.body;
    if (!body.email || !body.password) {
      res
        .status(200)
        .json({ message: "Please enter email & password", status: 0 });
      return;
    }
    const userExist = await User.findOne({ email: body.email });
    if (!userExist) {
      res.status(200).json({ message: "User not exist", status: 0 });
      return;
    }
    const comparePassword = await bcrypt.compare(
      body.password,
      userExist.password
    );
    if (!comparePassword) {
      res.status(200).json({ message: "Invalid login details", status: 0 });
      return;
    }
    const token = jwt.sign(
      { id: userExist._id.valueOf() },
      process.env.JWT_SECRET
    );

    const sendData = {
      name: userExist.name,
      email: userExist.email,
    };

    res
      .status(200)
      .cookie("token", token, {
        domain: process.env.NODE_ENV === "development" ? "localhost" : "https://narugopal-blog.vercel.app/",
        path: "/",
        secure: true,
        maxAge: 600000,
        httpOnly: true,
        sameSite: "none",
      })
      .json({ data: sendData, message: "Login successfully", status: 1 });
  } catch (e) {
    res.status(500).json({ message: e.message, status: 0 });
  }
};

module.exports.changepassword = async (req, res) => {
  try {
    const body = req.body;

    if (!body.current_password || !body.confirm_password) {
      res.status(200).json({
        message: "Please enter current & confirm password",
        status: 0,
      });
      return;
    }
    const userExist = await User.findOne({ _id: req.id });
    if (!userExist) {
      res.status(200).json({ message: "User not exist", status: 0 });
      return;
    }
    const comparePassword = await bcrypt.compare(
      body.current_password,
      userExist.password
    );
    if (!comparePassword) {
      res
        .status(200)
        .json({ message: "Current password not matching", status: 0 });
      return;
    }
    const hashPassword = await bcrypt.hash(body.confirm_password, 10);
    userExist.password = hashPassword;
    userExist.save();
    res.status(200).json({ message: "Password changed successfully", status: 1 });
  } catch (e) {
    res.status(500).json({ message: e.message, status: 0 });
  }
};
