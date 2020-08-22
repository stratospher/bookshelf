module.exports = app => {
    const reviews = require("../controllers/review.controller.js");
  
    // Create a new Review
    app.post("/review", reviews.create);
  
    // Retrieve all Reviews
    app.get("/review",reviews.findAll);
  
    // Retrieve a single Review with reviewId
    app.get("/review/:reviewId", reviews.findOne);
  
    // Update a Review with reviewId
    app.put("/review/:reviewId", reviews.update);
  
    // Delete a Review with reviewId
    app.delete("/review/:reviewId", reviews.delete);
  
    // Delete all reviews
    app.delete("/review", reviews.deleteAll);

    // app.use(function(req, res, next) {
    //     res.send(`Invalid URL`);
    //     next();
    // });
  };