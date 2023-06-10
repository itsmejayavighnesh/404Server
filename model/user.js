const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  uid: String,
  email: String,
});

const UserModel = mongoose.model("user", UserModelSchema);

module.exports = UserModel