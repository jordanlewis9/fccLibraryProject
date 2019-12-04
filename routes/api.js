/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
var bookController = require("./../controller/bookController");
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function(app) {
  app
    .route("/api/books")
    .get(bookController.getBooks)

    .post(bookController.createBook)

    .delete(bookController.deleteAllBooks);

  app
    .route("/api/books/:id")
    .get(bookController.getBook)

    .post(bookController.addComment)

    .delete(bookController.deleteBook);
};
