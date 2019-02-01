const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

//home route, shows the full list of books
router.get('/', (req, res, next) => {
  //show all books by title in asc alphabetical order
  Book.findAll({order: [['title', 'ASC']]})
   .then((books) => {
     res.render('index', { //index.pug (the table)
       books
     });
   })
   .catch((error) => {
     res.send(500, error);
     //Error 500--Internal Server Error
   })
});

/********************/
/****** BOOKS  ******/
/********************/
/*renders newBook.pug when create new book
 is clicked (Traveling /new route) */
router.get('/new', (req, res, next) => {
  res.render('newBook', {
    title: 'Enter A New Book',
  });
})

/* POST method create a new book if theres an error when filling out info for
new book, then show new book page again with err*/
router.post('/new', function(req, res, next) {
  Book.create(req.body).then(function(books) {
    res.redirect('/books/');
 })
 .catch((error) => {
    if(error.name === 'SequelizeValidationError') {
      res.render('newBook', {
         books: Book.build(req.body),
         title: 'Enter a New Book',
         errors: error.errors,
      })
    } else {
      throw error;
    }
 })
 .catch((error) => {
    res.send(500, error);
  });
});

/*GET book by id when title is clicked
render update book page, catch errors
*/
router.get('/:id', (req, res, next) => {
  Book.findById(req.params.id)
  .then((books) => {
    if(books){
      res.render('updateMe', {books, title: 'Want to change something?'});
    }
    else{
      res.send(404, error);
    }
  })
  .catch((error) => {
    res.send(500, erorr);
  })
});

//needs to POST
router.post('/:id', (req, res, next) => {
  Book.findById(req.params.id)
  .then((books) => {
    if(books){
      return books.update(req.body);
    }
    else{
      res.send(404, error);
    }
  })
  .then((books) => {
    res.redirect('/books');
  })
  .catch((error => {
    if(error.name === 'SequelizeValidationError'){
      const book = Book.build(req.body);
      book.id = req.params.id;
      res.render('updateMe', {
         books: book,
         title: 'Want to change something?',
         errors: error.errors,
     })
    }
    else{
      throw error
    }
  }))
  .catch((error) => {
    res.send(500, erorr);
  })
});



module.exports = router;
