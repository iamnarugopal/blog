const User = require("../models/usermodel");

module.exports.register = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    if (!body) {
      res.status(204).json({ message: "Blank detail can't save" });
      return false;
    }
    const userExist = await User.findOne({ email: body.email });
    if (userExist) {
      res.status(409).json({ message: "User already exist" });
      return false;
    }

    const result = new User(body);
    result
      .save()
      .then(() => console.log("User saved successfully"))
      .catch((e) => console.log(e.message));
    res.status(201).json({ message: "User saved successfully" });
  } catch (e) {
    console.log(e.message);
  }
};
