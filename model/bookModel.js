var mongoose = require("mongoose");

var bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: ["true", "The title of the book is required"]
  },
  comments: [String],
  commentcount: {
    type: Number,
    default: 0
  }
});

var Book = mongoose.model("Book", bookSchema);

module.exports = Book;
