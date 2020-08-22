const sql = require("./db.js");

// constructor
const Book = function(book) {
  this.title=book.title,
  this.authorId=book.authorId
};

Book.create = (newBook, result) => {
  sql.query("INSERT INTO books SET ?", newBook, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created book: ", { bookId: res.insertId, ...newBook });
    result(null, { bookId: res.insertId, ...newBook });
  });
};

Book.findById = (bookId, result) => {
  sql.query(`SELECT * FROM books WHERE bookId = ${bookId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found book: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Book.getAll = result => {
  sql.query("SELECT * FROM books", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("books: ", res);
    result(null, res);
  });
};

Book.updateById = (id, book, result) => {
  sql.query(
    "UPDATE books SET title = ?, authorId = ? WHERE bookId = ?",
    [book.title, book.authorId, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated book: ", { bookId: id, ...book });
      result(null, { bookId: id, ...book });
    }
  );
};

Book.remove = (id, result) => {
  sql.query("DELETE FROM books WHERE bookId = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted book with id: ", id);
    result(null, res);
  });
};

Book.removeAll = result => {
  sql.query("DELETE FROM books", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} books`);
    result(null, res);
  });
};

Book.getAllAuthorId =(authorId,result) => {
  sql.query(`SELECT * FROM books WHERE authorId=${authorId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("books: ", res);
    result(null, res);
  });
};

module.exports = Book;