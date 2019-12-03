var mongoose = require("mongoose");

var bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: ["true", "The title of the book is required"]
  },
  comment: [String]
});
module.exports = mongoose.model("Book", bookSchema);
