const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { User } = require("../db");

const router = express.router();

const signUpBody = zod.object({
  email: zod.string().email(),
  username: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const updatedBody = zod.object({
  email: zod.string().email().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const validator = signUpBody.safeParse({
    username,
    email,
    firstName,
    lastName,
    password,
  });
  if (!validator.success) {
    return res.status(411).json({
      msg: "Wrong inputs have been sent",
    });
  }

  const user = await User.create({
    username,
    email,
    firstName,
    lastName,
    password,
  });

  const userId = user._id;
  const token = jwt.sign({ userId, username }, "secret");

  return res.json({
    msg: "User created successfully",
    token,
  });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await User.findOne({
    username,
    password,
  });
  if (!existingUser) {
    return res.status(411).json({
      msg: "Incorrect username or password",
    });
  }
  const userId = existingUser._id;
  const token = jwt.sign({ userId, username }, "secret");
  return res.json({
    msg: "Signed in successfully",
    token,
  });
});

router.put("/", async (req, res) => {
  const updatedBody = updateBody.safeParse(req.body);
  if (!updatedBody.success) {
    res.status(411).json({
      msg: "Error while updating information",
    });
  }
  await User.updateOne({ _id: req.userId }, req.body);
  res.json({
    msg: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const userId = req.userId;
  const filter = req.query.filter || "";
  const users = await User.find({
    $and: [
      {
        _id: {
          $ne: signedInUserId, // Exclude the signed-in user
        },
      },
      {
        $or: [
          {
            firstName: {
              $regex: filter,
              $options: "i", // Case-insensitive search
            },
          },
          {
            lastName: {
              $regex: filter,
              $options: "i", // Case-insensitive search
            },
          },
        ],
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    })),
  });
});
