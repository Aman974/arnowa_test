const express = require("express");
const UserSchema = require("./models");
const app = express();

app.post("/login", async (req, res) => {
  try {
    const newUser = await new UserSchema({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(409).json("user already exist");
    console.log(err);
  }
});

app.get("/users", async (req, res) => {
  const users = await UserSchema.find();

  try {
    res.json(users);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

module.exports = app;
