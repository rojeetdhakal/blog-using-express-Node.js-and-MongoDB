const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const blogRoutes=require('./routes/blogRoutes')
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(blogRoutes)
// app.use((req,res,next)=>{
//   console.log("new request made")           //Custom MIddleware
//   console.log("host",req.hostname)
//   console.log("path",req.path)
//   console.log('method',req.method)
//   next()
// })
app.use(express.static("public"));

mongoose
  .connect(process.env.DB_URI)
  .then((result) => {
    app.listen(process.env.PORT, (req, res) => {
      console.log(
        `Database is connected and server is running in the port http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
