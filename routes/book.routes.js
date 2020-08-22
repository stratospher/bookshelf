module.exports = app => {
    const books = require("../controllers/book.controller.js");
  
    // Create a new Author
    app.post("/book", books.create);
  
    // Retrieve all Authors
    app.get("/book",books.findAll);
  
    // Retrieve a single Author with authorId
    app.get("/book/:bookId", books.findOne);
  
    // Update an Author with authorId
    app.put("/book/:bookId", books.update);
  
    // Delete an Author with authorId
    app.delete("/book/:bookId", books.delete);
  
    // Delete all authors
    app.delete("/book", books.deleteAll);

    // app.use(function(req, res, next) {
    //     res.send(`Invalid URL`);
    //     next();
    // });
  };