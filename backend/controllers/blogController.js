const Blog = require("../models/blogmodel");

const getSlug = (string) => {
  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9\-]/g, "") // Remove non-alphanumeric characters except hyphen
    .replace(/\-{2,}/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
};

module.exports.getblog = async (req, res) => {
  try {
    const blog = await Blog.find({}, { long_description: 0 }).populate(
      "author",
      ["email", "name"]
    );
    // if (!blog.length) {
    //   res.status(404).json({ message: "No blog created yet", status: 0 });
    //   return;
    // }
    res.status(200).json({ data: blog, message: "Success", status: 1 });
  } catch (e) {
    res.status(500).json({ message: e.message, status: 0 });
  }
};

module.exports.getblogDetail = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug }).populate("author", [
      "email",
      "name",
    ]);
    if (!blog) {
      res
        .status(404)
        .json({ message: "No blog found with this slug", status: 0 });
      return;
    }
    res.status(200).json({ data: blog, message: "Success", status: 1 });
  } catch (e) {
    res.status(500).json({ message: e.message, status: 0 });
  }
};

module.exports.addblog = async (req, res) => {
  try {
 
    const { title, short_description, long_description } = req.body;
    const image = `${process.env.BLOG_IMAGE_URL}${req.file.filename}`;
    const author = req.id;
    if (title === "" || short_description === "" || long_description === "") {
      res
        .status(200)
        .json({ message: "Please fill required fields", status: 0 });
      return;
    }
    const slug = getSlug(title);
    const slugExist = await Blog.findOne({ slug });

    if (!!slugExist) {
      res.status(409).json({ message: "Slug already exist", status: 0 });
      return;
    }
    const result = new Blog({
      title,
      slug,
      short_description,
      long_description,
      author,
      image,
    });
    result
      .save()
      .then(() =>
        res.status(201).json({ message: "Blog saved successfully", status: 1 })
      )
      .catch((e) => res.status(200).json({ message: e.message, status: 0 }));
  } catch (e) {
    res.status(500).json({ message: e.message, status: 0 });
  }
};

// module.exports.login = async (req, res) => {
//   try {
//     const body = req.body;
//     if (!body.email || !body.password) {
//       res
//         .status(200)
//         .json({ message: "Please enter email & password", status: 0 });
//       return;
//     }
//     const userExist = await User.findOne({ email: body.email });
//     if (!userExist) {
//       res.status(200).json({ message: "User not exist", status: 0 });
//       return;
//     }
//     const comparePassword = await bcrypt.compare(
//       body.password,
//       userExist.password
//     );
//     if (!comparePassword) {
//       res.status(200).json({ message: "Invalid login details", status: 0 });
//       return;
//     }
//     const token = jwt.sign(
//       { id: userExist._id.valueOf() },
//       process.env.JWT_SECRET
//     );

//     const sendData = {
//       name: userExist.name,
//       email: userExist.email,
//     };

//     res
//       .status(200)
//       .cookie("token", token, {
//         domain: "localhost",
//         path: "/",
//         secure: true,
//         maxAge: 600000,
//         httpOnly: true,
//         sameSite: "none",
//       })
//       .json({ data: sendData, message: "Login successfully", status: 1 });
//   } catch (e) {
//     res.status(500).json({ message: e.message, status: 0 });
//   }
// };

// module.exports.changepassword = async (req, res) => {
//   try {
//     const body = req.body;

//     if (!body.current_password || !body.confirm_password) {
//       res.status(200).json({
//         message: "Please enter current & confirm password",
//         status: 0,
//       });
//       return;
//     }
//     const userExist = await User.findOne({ _id: req.id });
//     if (!userExist) {
//       res.status(200).json({ message: "User not exist", status: 0 });
//       return;
//     }
//     const comparePassword = await bcrypt.compare(
//       body.current_password,
//       userExist.password
//     );
//     if (!comparePassword) {
//       res
//         .status(200)
//         .json({ message: "Current password not matching", status: 0 });
//       return;
//     }
//     const hashPassword = await bcrypt.hash(body.confirm_password, 10);
//     userExist.password = hashPassword;
//     userExist.save();
//     res.status(200).json({ message: "Password changed successfully", status: 1 });
//   } catch (e) {
//     res.status(500).json({ message: e.message, status: 0 });
//   }
// };
