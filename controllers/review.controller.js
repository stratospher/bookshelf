const Review = require("../models/review.model.js");

// Create and Save a new Review
exports.create = (req, res) => {
    console.log("^^",req.body);
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

  // Create a Review
    const review = new Review({
        bookId:req.body.bookId,
        bReview:req.body.bReview
    });
    console.log("&&",review);
  // Save Review in the database
    Review.create(review, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating Review."
            });
        else res.send(data);
    });
};

// Retrieve all Reviews from the database.
exports.findAll = (req, res) => {
     if(req.query.bookId){
          Review.getAllBookId(req.query.bookId,(err, data) => {
              if (err)
                  res.status(500).send({
                      message:
                      err.message || "Some error occurred while retrieving reviews with bookId."
                  });
              else res.send(data);
          });
     }
     else{
          if(Object.keys(req.query).length !== 0)
          {
              return res.end("Enter request in the form /review?bookId=x")
          }
          Review.getAll((err, data) => {
              if (err)
                  res.status(500).send({
                    message:
                    err.message || "Some error occurred while retrieving reviews."
                  });
              else res.send(data);
        });
     }
};

// Find a single Review with a reviewId
exports.findOne = (req, res) => {
    Review.findById(req.params.reviewId, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Review with id ${req.params.reviewId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Review with id " + req.params.reviewId
                });
            }
          } else res.send(data);
        });
};

// Update a Review identified by the reviewId in the request
exports.update = (req, res) => {
        // Validate Request
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
        }
      
        Review.updateById(
          req.params.reviewId,
          new Review(req.body),
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Review with id ${req.params.reviewId}.`
                });
              } else {
                res.status(500).send({
                  message: "Error updating Review with id " + req.params.reviewId
                });
              }
            } else res.send(data);
          }
        );
};

// Delete a Review with the specified reviewId in the request
exports.delete = (req, res) => {
        Review.remove(req.params.reviewId, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Review with id ${req.params.reviewId}.`
              });
            } else {
              res.status(500).send({
                message: "Could not delete Review with id " + req.params.reviewId
              });
            }
          } else res.send({ message: `Review was deleted successfully!` });
        });
};

// Delete all Reviews from the database.
exports.deleteAll = (req, res) => {
    Review.removeAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all reviews."
            });
          else res.send({ message: `All Reviews were deleted successfully!` });
        });
};