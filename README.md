# bookshelf

## Installation

1. clone the repo
2. create a database in mysql and name it testdb
3. Create 3 tables in mysql using below commands

```sql
CREATE TABLE `testdb`.`authors` (
  `authorId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
   PRIMARY KEY (`authorId`,`name`)
   UNIQUE KEY `name` (`name`)
);
 ```
  
  ```sql
   CREATE TABLE `testdb`.`books` (
  `bookId` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `authorId` INT NOT NULL,
   PRIMARY KEY (`bookId`),
   FOREIGN KEY (authorId) 
   REFERENCES authors(authorId) 
   ON UPDATE CASCADE ON DELETE CASCADE
   );
   ```
   
   ```sql
   CREATE TABLE `testdb`.`reviews` (
  `reviewId` INT NOT NULL AUTO_INCREMENT,
  `bookId` INT NOT NULL,
  `bReview` VARCHAR(200) NOT NULL,
   PRIMARY KEY (`reviewId`),
   FOREIGN KEY (bookId) 
   REFERENCES books(bookId) 
   ON UPDATE CASCADE ON DELETE CASCADE
   );
   ```
   4. Go to config/db.config.js and enter correct config details of ur system
   5. Use postman to implement the requests. Use these to get started
      * on POST and PUT requests to /author include in body something like
          {
            "name":"rick riordan"
          }
      * on POST and PUT requests to /book include in body something like
         {
            "title": "Lightning Thief",
            "authorId": 8
          }
       * on POST and PUT requests to /review include in body something like
         {
            "bookId": 8,
            "bReview": "PJ is awesome!"
         }
