module.exports = app => {
    const reviews = require("../controllers/review.controller.js");
  
    // Create a new Author
    app.post("/review", reviews.create);
  
    // Retrieve all Authors
    app.get("/review",reviews.findAll);
  
    // Retrieve a single Author with authorId
    app.get("/review/:reviewId", reviews.findOne);
  
    // Update an Author with authorId
    app.put("/review/:reviewId", reviews.update);
  
    // Delete an Author with authorId
    app.delete("/review/:reviewId", reviews.delete);
  
    // Delete all authors
    app.delete("/review", reviews.deleteAll);

    // app.use(function(req, res, next) {
    //     res.send(`Invalid URL`);
    //     next();
    // });
  };