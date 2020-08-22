const sql = require("./db.js");

// constructor
const Author = function(author) {
  this.name=author.name;
};

Author.create = (newAuthor, result) => {
  sql.query("INSERT INTO authors SET ?", newAuthor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created author: ", { authorId: res.insertId, ...newAuthor });
    result(null, { authorId: res.insertId, ...newAuthor });
  });
};

Author.findById = (authorId, result) => {
  sql.query(`SELECT * FROM authors WHERE authorId = ${authorId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found author: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Author.getAll = result => {
  sql.query("SELECT * FROM authors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("authors: ", res);
    result(null, res);
  });
};

Author.updateById = (id, author, result) => {
  sql.query(
    "UPDATE authors SET name = ? WHERE authorId = ?",
    [author.name, id],
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

      console.log("updated author: ", { authorId: id, ...author });
      result(null, { authorId: id, ...author });
    }
  );
};

Author.remove = (id, result) => {
  sql.query("DELETE FROM authors WHERE authorId = ?", id, (err, res) => {
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

    console.log("deleted author with id: ", id);
    result(null, res);
  });
};

Author.removeAll = result => {
  sql.query("DELETE FROM authors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} authors`);
    result(null, res);
  });
};

module.exports = Author;