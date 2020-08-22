module.exports = app => {
    const authors = require("../controllers/author.controller.js");
  
    // Create a new Author
    app.post("/author", authors.create);
  
    // Retrieve all Authors
    app.get("/author", authors.findAll);
  
    // Retrieve a single Author with authorId
    app.get("/author/:authorId", authors.findOne);
  
    // Update an Author with authorId
    app.put("/author/:authorId", authors.update);
  
    // Delete an Author with authorId
    app.delete("/author/:authorId", authors.delete);
  
    // Delete all authors
    app.delete("/author", authors.deleteAll);

    // app.use(function(req, res, next) {
    //     res.send(`Invalid URL`);
    //     next();
    // });
  };