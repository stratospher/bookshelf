module.exports = app => {
    const books = require("../controllers/book.controller.js");
  
    // Create a new Book
    app.post("/book", books.create);
  
    // Retrieve all Books
    app.get("/book",books.findAll);
  
    // Retrieve a single Book with bookId
    app.get("/book/:bookId", books.findOne);
  
    // Update a Book with bookId
    app.put("/book/:bookId", books.update);
  
    // Delete a Book with bookId
    app.delete("/book/:bookId", books.delete);
  
    // Delete all books
    app.delete("/book", books.deleteAll);

    // app.use(function(req, res, next) {
    //     res.send(`Invalid URL`);
    //     next();
    // });
  };