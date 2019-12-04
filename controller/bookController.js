var Book = require("./../model/bookModel");

exports.createBook = async (req, res) => {
  try {
    var newBook = await Book.create({ title: req.body.title });
    res.status(200).json({
      status: "success",
      data: {
        newBook
      }
    });
  } catch (err) {
    res.status(400).json({
      error: "Error. Please try again."
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    var books = await Book.find();
    res.status(200).json({
      status: "success",
      data: {
        books
      }
    });
  } catch (err) {
    res.status(400).json({
      error: "Error. Please try again."
    });
  }
};

exports.deleteAllBooks = async (req, res) => {
  try {
    var deletedBooks = await Book.deleteMany();
    res.status(200).json({
      status: "complete delete successful"
    });
  } catch (err) {
    res.status(400).json({
      error: "Error. Please try again."
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    var singleBook = await Book.findById(req.params.id);
    res.status(200).json({
      status: `found book with id ${req.params.id}`,
      data: {
        singleBook
      }
    });
  } catch (err) {
    console.log(err);
    if (err.name === "CastError") {
      res.status(400).json({
        error: "no book exists"
      });
    } else {
      res.status(400).json({
        error: err
      });
    }
  }
};

exports.addComment = async (req, res) => {
  try {
    var comment = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comment: req.body.comment }
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        comment
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    var deleteBook = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "delete successful"
    });
  } catch (err) {
    res.status(400).json({
      error: err
    });
  }
};
