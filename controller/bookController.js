var Book = require("./../model/bookModel");

exports.createBook = async (req, res) => {
  var newBook = await Book.create({ title: req.body.title });
  res.status(200).json({
    status: "success",
    data: {
      newBook
    }
  });
};

exports.getBooks = async (req, res) => {
  var books = await Book.find();
  res.status(200).json({
    status: "success",
    data: {
      books
    }
  });
};

exports.deleteAllBooks = async (req, res) => {
  var deletedBooks = await Book.deleteMany();
  res.status(200).json({
    status: "complete delete successful"
  });
};
