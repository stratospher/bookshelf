const sql = require("./db.js");

// constructor
const Review = function(review) {
  this.bookId=review.bookId;
  this.bReview=review.bReview;
};

Review.create = (newReview, result) => {
  sql.query("INSERT INTO reviews SET ?", newReview, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created review: ", { reviewId: res.insertId, ...newReview });
    result(null, { reviewId: res.insertId, ...newReview });
  });
};

Review.findById = (reviewId, result) => {
  sql.query(`SELECT * FROM reviews WHERE reviewId = ${reviewId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found review: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Review.getAll = result => {
  sql.query("SELECT * FROM reviews", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("reviews: ", res);
    result(null, res);
  });
};

Review.updateById = (id, review, result) => {
  sql.query(
    "UPDATE reviews SET bookId = ?, bReview = ? WHERE reviewId = ?",
    [review.bookId, review.bReview, id],
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

      console.log("updated review: ", { reviewId: id, ...review });
      result(null, { reviewId: id, ...review });
    }
  );
};

Review.remove = (id, result) => {
  sql.query("DELETE FROM reviews WHERE reviewId = ?", id, (err, res) => {
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

    console.log("deleted review with id: ", id);
    result(null, res);
  });
};

Review.removeAll = result => {
  sql.query("DELETE FROM reviews", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} reviews`);
    result(null, res);
  });
};

Review.getAllBookId =(bookId,result) => {
  sql.query(`SELECT * FROM reviews where bookId=${bookId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("reviews: ", res);
    result(null, res);
  });
};

module.exports = Review;