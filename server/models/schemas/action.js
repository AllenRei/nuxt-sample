const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

module.exports = new Schema({
  author: { type: ObjectId, ref: "User", required: true },
  createdAt: { type: Number, required: false },
  type: { type: Number, required: true },
  data: { type : Object, required : false }
});