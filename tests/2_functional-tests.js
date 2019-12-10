/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!
   */
  test("#example Test GET /api/books", function(done) {
    chai
      .request(server)
      .get("/api/books")
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body.data.books, "response should be an array");
        assert.property(
          res.body.data.books[0],
          "commentcount",
          "Books in array should contain commentcount"
        );
        assert.property(
          res.body.data.books[0],
          "title",
          "Books in array should contain title"
        );
        assert.property(
          res.body.data.books[0],
          "_id",
          "Books in array should contain _id"
        );
        done();
      });
  });
  /*
   * ----[END of EXAMPLE TEST]----
   */

  suite("Routing tests", function() {
    suite(
      "POST /api/books with title => create book object/expect book object",
      function() {
        test("Test POST /api/books with title", function(done) {
          chai
            .request(server)
            .post("/api/books")
            .send({ title: "Catcher in the Rye" })
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.body.data.title, "Catcher in the Rye");
              assert.property(res.body.data, "_id", "_id exists");
              done();
            });
        });

        test("Test POST /api/books with no title given", function(done) {
          chai
            .request(server)
            .post("/api/books")
            .send({})
            .end(function(err, res) {
              assert.equal(res.status, 400);
              assert.equal(res.body.error, "The title of the book is required");
              done();
            });
        });
      }
    );

    suite("GET /api/books => array of books", function() {
      test("Test GET /api/books", function(done) {
        chai
          .request(server)
          .get("/api/books")
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body.data.books, "response should be an array");
            assert.property(
              res.body.data.books[0],
              "commentcount",
              "Books in array should contain commentcount"
            );
            assert.property(
              res.body.data.books[0],
              "title",
              "Books in array should contain title"
            );
            assert.property(
              res.body.data.books[0],
              "_id",
              "Books in array should contain _id"
            );
            done();
          });
      });
    });

    suite("GET /api/books/[id] => book object with [id]", function() {
      test("Test GET /api/books/[id] with id not in db", function(done) {
        chai
          .request(server)
          .get("/api/books/idnotindatabase")
          .end(function(err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.body.error, "no book exists");
            done();
          });
      });

      test("Test GET /api/books/[id] with valid id in db", function(done) {
        chai
          .request(server)
          .get("/api/books/5deebd10a16a511eac8a66f2")
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(
              res.body.status,
              "found book with id 5deebd10a16a511eac8a66f2"
            );
            assert.equal(res.body.data.singleBook.title, "The Grapes of Wrath");
            assert.equal(res.body.data.singleBook.comments.length, 1);
            assert.equal(
              res.body.data.singleBook._id,
              "5deebd10a16a511eac8a66f2"
            );
            done();
          });
      });
    });

    suite(
      "POST /api/books/[id] => add comment/expect book object with id",
      function() {
        test("Test POST /api/books/[id] with comment", function(done) {
          chai
            .request(server)
            .post("/api/books/5deefb445f53ee2d08878fda")
            .send({ comments: "Cool Book" })
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.body.status, "success");
              assert.equal(res.body.data._id, "5deefb445f53ee2d08878fda");
              assert.equal(res.body.data.title, "Catcher in the Rye");
              assert.equal(
                res.body.data.comments[res.body.data.comments.length - 1],
                "Cool Book"
              );
              done();
            });
        });
      }
    );
  });
});
