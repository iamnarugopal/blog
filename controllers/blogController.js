const handleUpload = require("../middleware/cloudinary");
const fs = require("fs");
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

module.exports.myblog = async (req, res) => {
  try {
    const blog = await Blog.find(
      { author: req.id },
      { long_description: 0 }
    ).populate("author", ["email", "name"]);
    res.status(200).json({ data: blog, message: "Success", status: 1 });
  } catch (e) {
    res.status(500).json({ message: e.message, status: 0 });
  }
};

module.exports.getblogDetailBySlug = async (req, res) => {
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

module.exports.getblogDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ _id: id });
    if (!blog) {
      res
        .status(404)
        .json({ message: "No blog found with this id", status: 0 });
      return;
    }
    res.status(200).json({ data: blog, message: "Success", status: 1 });
  } catch (e) {
    res.status(500).json({ message: e.message, status: 0 });
  }
};

module.exports.addblog = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);

    // const { title, short_description, long_description } = req.body;
    // const image = `${process.env.BLOG_IMAGE_URL}${req.file.filename}`;
    // const author = req.id;
    // if (title === "" || short_description === "" || long_description === "") {
    //   res
    //     .status(200)
    //     .json({ message: "Please fill required fields", status: 0 });
    //   return;
    // }
    // const slug = getSlug(title);
    // const slugExist = await Blog.findOne({ slug });

    // if (!!slugExist) {
    //   res.status(409).json({ message: "Slug already exist", status: 0 });
    //   return;
    // }
    // const result = new Blog({
    //   title,
    //   slug,
    //   short_description,
    //   long_description,
    //   author,
    //   image,
    // });
    // result
    //   .save()
    //   .then(() =>
    //     res.status(201).json({ message: "Blog saved successfully", status: 1 })
    //   )
    //   .catch((e) => res.status(200).json({ message: e.message, status: 0 }));
  } catch (e) {
    res.status(500).json({ message: e.message, status: 0 });
  }
};

module.exports.updateblog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, short_description, long_description } = req.body;
    const image = !!req.file?.filename
      ? `${process.env.BLOG_IMAGE_URL}${req.file.filename}`
      : "";
    const author = req.id;
    const slug = getSlug(title);
    const slugExist = await Blog.findOne({ slug, _id: { $ne: id } });
    const blogExist = await Blog.findOne({ _id: id });
    if (!!slugExist) {
      res.status(409).json({ message: "Slug already exist", status: 0 });
      return;
    }
    if (blogExist.author.valueOf() !== req.id) {
      res.status(409).json({
        message: "You are not authorized to edit this blog",
        status: 0,
      });
      return;
    }
    const updateData = {
      title,
      slug,
      short_description,
      long_description,
      author,
      image,
    };
    Object.keys(updateData).map(
      (key) => !updateData[key] && delete updateData[key]
    );

    //delete image
    if (!!blogExist?.image && req.file?.filename) {
      let imagename = (blogExist?.image).split(process.env.BLOG_IMAGE_URL)[1];
      fs.stat(`./images/blogs/${imagename}`, function (err, stats) {
        //console.log(stats); //here we got all information of file in stats variable

        if (err) {
          return console.error(err);
        }

        fs.unlink(`./images/blogs/${imagename}`, function (err) {
          if (err) return console.log(err);
        });
      });
    }

    const result = await Blog.findByIdAndUpdate(
      { _id: id },
      {
        ...updateData,
      }
    );

    res.status(201).json({ message: "Blog updated successfully", status: 1 });
  } catch (e) {
    res.status(500).json({ message: e.message, status: 0 });
  }
};

module.exports.deleteblog = async (req, res) => {
  try {
    const { id } = req.params;
    const blogExist = await Blog.findOne({ _id: id });
    if (blogExist.author.valueOf() !== req.id) {
      res.status(409).json({
        message: "You are not authorized to delete this blog",
        status: 0,
      });
      return;
    }
    //delete image
    if (!!blogExist?.image) {
      let imagename = (blogExist?.image).split(process.env.BLOG_IMAGE_URL)[1];
      fs.stat(`./images/blogs/${imagename}`, function (err, stats) {
        //console.log(stats); //here we got all information of file in stats variable

        if (err) {
          return console.error(err);
        }

        fs.unlink(`./images/blogs/${imagename}`, function (err) {
          if (err) return console.log(err);
        });
      });
    }

    const result = await Blog.findByIdAndDelete(id);
    if (result)
      res.status(200).json({ message: "Blog deleted successfully", status: 1 });
  } catch (e) {
    res.status(500).json({ message: e.message, status: 0 });
  }
};
