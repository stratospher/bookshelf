const Author = require("../models/author.model.js");

// Create and Save a new Author
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

  // Create an Author
    const author = new Author({
        name: req.body.name
    });

  // Save Author in the database
    Author.create(author, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Author."
            });
        else res.send(data);
    });
};

// Retrieve all Authors from the database.
exports.findAll = (req, res) => {
        Author.getAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving authors."
            });
          else res.send(data);
        });
};

// Find a single Author with a authorId
exports.findOne = (req, res) => {
        Author.findById(req.params.authorId, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Author with id ${req.params.authorId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Author with id " + req.params.authorId
                });
            }
          } else res.send(data);
        });
};

// Update an Author identified by the authorId in the request
exports.update = (req, res) => {
        // Validate Request
        if (!req.body) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
        }
      
        Author.updateById(
          req.params.authorId,
          new Author(req.body),
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Author with id ${req.params.authorId}.`
                });
              } else {
                res.status(500).send({
                  message: "Error updating Author with id " + req.params.authorId
                });
              }
            } else res.send(data);
          }
        );
};

// Delete an Author with the specified authorId in the request
exports.delete = (req, res) => {
        Author.remove(req.params.authorId, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Author with id ${req.params.authorId}.`
              });
            } else {
              res.status(500).send({
                message: "Could not delete Author with id " + req.params.authorId
              });
            }
          } else res.send({ message: `Author was deleted successfully!` });
        });
};

// Delete all Authors from the database.
exports.deleteAll = (req, res) => {
        Author.removeAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all authors."
            });
          else res.send({ message: `All Authors were deleted successfully!` });
        });
};