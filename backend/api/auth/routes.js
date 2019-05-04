const express = require("express");
const bcryptjs = require("bcryptjs");
const AdminModel = require("../admin/models");
const authRouter = express();

authRouter.post("/register", async (req, res) => {
  try {
    const adminInfo = req.body;
    const hashPassword = await bcryptjs.hash(adminInfo.password, 10);
    const newAdmin = await AdminModel.create({
      ...adminInfo,
      password: hashPassword
    });
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).end(error.message);
  }
});

authRouter.post("/login", async (req, res) => {
    console.log(req.body);
  try {
    const loginInfo = req.body;
    const admin = await AdminModel.findOne({ email: loginInfo.email }).exec();
    console.log(admin);
    if (!admin) {
      res.status(404).json({
        message: "Admin not found!",
        success: false
      });
    } else {
      const checkPassword = await bcryptjs.compare(
        loginInfo.password,
        admin.password
      );
      if (checkPassword) {
        //success
        // create session storage
        console.log(admin._id);
        req.session.admin = {
          _id: admin._id,
          email: admin.email,
        };
        //save
        req.session.save();
        res.status(200).json({
          message: "login success!",
          success: true
        });
      } else {
        res.status(200).json({
          message: "password is incorrect!",
          success: false
        });
      }
    }
  } catch (error) {
    res.status(500).end(error.message);
  }
});

authRouter.get('/logout',(req,res)=>{
    try{
        req.session.destroy();
        res.status(200).json({
            message: "logout success!",
            success: true,
        });
    }catch(error){
        res.status(500).end(error.message);
    }
});

module.exports = authRouter;