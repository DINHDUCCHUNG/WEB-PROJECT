const express = require("express");
const adminRouter = express();
const AdminModel = require("./models");

adminRouter.post("/", async (req, res) => {
  try {
    console.log(req.body);
    //check email
    const existEmail = await AdminModel.findOne({
      email: req.body.email,
    }).exec();
    if (existEmail) {
      res.status(403).end("Email has been used!");
    }
    const adminInfo = req.body;
    const newAdmin = await AdminModel.create({
      ...adminInfo,
      createAt: new Date()
    });
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).end(error.message);
  }
});

module.exports = adminRouter;
