// include packages
var express = require('express');
var app = express();                 
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static('public'));

// connect to database
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/bookApp');
mongoose.connect(process.env.MONGODB_URI);

// require the schema
var BookSchema = require('./models/bookApp');
// create an instance of BookSchema-model
var bookSchema = new BookSchema();

// use bodyParser to read from the url
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// port for the application
var port = process.env.PORT || 3000;

// routes
var router = express.Router();             

// middleware that allows the services to be connected from other domains
app.all('/*', function(req, res, next){
	res.header("Access-Control-Allow-Origin", "no");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
	next();
});

router.route('/user/:email')
	// GET user with email
	.get(function(req, res){
		BookSchema.findOne({
			email: req.params.email
		}).exec(function(err, User) { 
			if(err) {
				res.send(err);
			}
			res.json(User); 
		});
	});

router.route('/users')
	// add user with POST
	.post(function(req, res){

		// assign data
		bookSchema.email = req.body.email,
		bookSchema.password = req.body.password,
		bookSchema.firstname = req.body.firstname,
		bookSchema.lastname = req.body.lastname

		// save user and write out error message if necessary
		bookSchema.save(function(err) {
			if(err) {
				res.send(err);
			}
			res.json({ message: 'Användare skapad' });
		});
	});

// specific user: /users/:id
router.route('/users/:id')
	// update user with PUT
	.put(function(req, res) {
		// use the BookSchema-model to read from id
		BookSchema.findById(req.params.id, function(err, BookSchema) {
			if(err) {
				res.send(err);
			}
			// update status
			BookSchema.email = req.body.email;
			BookSchema.password = req.body.password;
			BookSchema.firstname = req.body.firstname;
			BookSchema.lastname = req.body.lastname;
			// save todo
			BookSchema.save(function(err) {
				if(err) {
					res.send(err);
				}
				res.json({ message: "Uppdaterat!" });
			})
		});
	})

	// delete user (DELETE)
	.delete(function(req, res) {
		BookSchema.findOneAndRemove(
			{ '_id': req.params.id },
			function(err) {
				if(err) {
					res.send(err);
				}
				res.sendStatus(200);
			}
		);
	});

router.route('/books/:user_id')
	// GET all user/book-info
	.get(function(req, res){
		BookSchema.findOne({
			_id: req.params.user_id
		}).exec(function(err, BookList) { 
			if(err) {
				res.send(err);
			}
			res.json(BookList); 
		});
	})

	// add book to user (PUT)
	.put(function(req, res) {
		// use the BookSchema-model to read from id
		BookSchema.findByIdAndUpdate(
			req.params.user_id,
			{ $push: { 'books': {
				title: req.body.title,
				author: req.body.author,
				grade: req.body.grade,
				genre: req.body.genre,
				review: req.body.review,
				done: req.body.done
			}}},
			{ safe: true, new: true},
			function(err, model) {
				if(err) {
					res.send(err);
				}
				res.json({ message: "Lagt till bok!" });
			}
		);
	});

router.route('/update/:book_id')
	// update existing book (PUT)
	.put(function(req, res) {
		BookSchema.findOneAndUpdate(
		{ 'books._id': req.params.book_id },
		{ $set: {
			'books.$.title': req.body.title,
			'books.$.author': req.body.author,
			'books.$.grade': req.body.grade,
			'books.$.genre': req.body.genre,
			'books.$.review': req.body.review,
			'books.$.done': req.body.done,
			'books.$.edited': new Date()
		}},
		function(err) {
			if(err) {
				res.send(err);
			}
			res.json({ message: "Uppdaterat bok!" });
		}
		);
	})

	// delete book (DELETE)
	.delete(function(req, res) {
		BookSchema.findOneAndUpdate(
			{ 'books._id': req.params.book_id },
			{ $pull: {
				books: { _id: req.params.book_id }
			}}
		).exec(function(err) { 
			if(err) {
				res.send(err);
			}
			res.sendStatus(200);
		});
	});

// all calls use the prefix /api
app.use('/api', router);

// start the server
app.listen(port);
console.log('Webbtjänsten är startad och kan nås på http://localhost:' + port);