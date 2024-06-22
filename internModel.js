const mongoose = require("mongoose");

const internSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An intern must have a name please!"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide your phone number"],
    unique: true,
  },
  specialty: {
    type: String,
    required: [true, "Please provide your specialty"],
  },
  school: {
    type: String,
    required: [true, "Please provide your school"],
  },
  gpa: {
    type: Number,
    required: [true, "Please provide your first semester GPA"],
  },
  hub: {
    type: String,
    enum: ["webDev", "devops1", "devops2", "react", "wLang"],
    required: [true, "Please choose a hub for your internship"],
  },
  message: String,
});

const Intern = new mongoose.model("Intern", internSchema);

module.exports = Intern;
