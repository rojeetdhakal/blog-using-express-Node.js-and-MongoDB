const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
router.get("/", (req, res) => {
  res.redirect("/blogs");
});
router.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    });
});
router.post("/blogs", (req, res, next) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/blogs/inner/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
router.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});
router.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
