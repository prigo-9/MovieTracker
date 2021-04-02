const mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost/userprofile");
const profileSchema = new mongoose.Schema({
  name: String,
  age: String,
  media_link: String,
});

module.exports = mongoose.model("UserProf", profileSchema);
