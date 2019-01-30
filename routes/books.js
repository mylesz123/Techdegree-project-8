const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

//home route, shows the full list of books
router.get('/', (req, res, next) => {
  //show all books by title in ascending order
  Book.findAll({order: [["title", "ASC"]]})
   .then((books) => {
     res.render("index", {
       books: books,
       title: "SQL Library Manager"
     });
     //render index/ home pug file
   })
   .catch((error) => {
     res.send(500, error);
     //Error 500--Internal Server Error
     //The server encountered an unexpected condition which prevented it from fulfilling the request.
   })
});

/********************/
/****** BOOKS  ******/
/********************/


module.exports = router;
