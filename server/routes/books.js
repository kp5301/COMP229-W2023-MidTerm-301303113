// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  res.render('book-details', {
    title: 'Add Book',
    books: {}
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  let book = new Book({
    title: req.body.title,
    author: req.body.author,
    publicationDate: req.body.publicationDate,
    genre: req.body.genre
  });
  book.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/books');
    }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let id = req.params.id;
  Book.findById(id, (err, book) => {
    res.render('book-details', {
      title: 'Edit Book',
      books: book
    });
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.params.id;
  let book = {};
  book.title = req.body.title;
  book.author = req.body.author;
  book.publicationDate = req.body.publicationDate;
  book.genre = req.body.genre;

  let query = {_id: id};
  Book.update(query, book, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/books');
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;
  Book.remove({_id: id}, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/books');
    }
  });
});


module.exports = router;
it('should render the add book form', (done) => {
  chai.request(server)
    .get('/books/add')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      done();
    });
});
