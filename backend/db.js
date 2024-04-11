const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://adityasangani21:root@learningcluster.zkpn4to.mongodb.net/habit_app"
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 30,
  },
});

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 30,
  },
});



const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = {
  User,
  Admin,
};
