angular.module('BookApp')
	.controller('BooksIndexController', function($scope, $http, $location, $parse) {
		var user = localStorage.user;
		// if user is not logged in, send to login page
		if (user == null) {
			$location.path('/login');
		}
		else {
			$scope.filters = {}; // set empty filtering (use later to filter grade/genre/author)
			$scope.sortBy = '-grade'; // set default value for sort
			// get booklist from api
			$http.get('https://sape-i-heart-books.herokuapp.com/api/books/' + user).success(function(data){
				$scope.bookList = data;
			});
		}
		// clear filters on button click
		$scope.clearFilters = function() {
			$scope.filters = {};
			$scope.filterQuery = '';
		};
		// check if fields are not editable
		$scope.checkStatus = function(element, match) {
			if(!($('.editable').hasClass('editField'))) {
				var ref = 'filters.' + element, // create variable with filter filters
				getter = $parse(ref); // convert to function
				getter.assign($scope, match); // assign it the clicked content
			}
		};
		// click on moreButton shows more info about the book
		$scope.showMore = function(bookId) {
			$('#' + bookId + ' .infoContainer').toggle(); // show/hide more info
			$('#' + bookId + ' .smallPrint').toggle(); // hide/show author (small)
			$('#' + bookId + ' .editable').attr('contenteditable', 'false'); // makes the book fields not editable
			$('#' + bookId + ' .editable').removeClass('editField'); // removes class that makes the fields look editable
			$('#' + bookId + ' .editButton').show(); // show the editButton
			$('#' + bookId + ' .saveButton').hide(); // hide the saveButton
		};
		// click on editButton makes the book fields editable
		$scope.editBook = function(bookId) {
			// hide the editButton
			$('#' + bookId + ' .editButton').hide();
			//show the saveButton
			$('#' + bookId + ' .saveButton').show();
			// makes the book fields editable
			$('#' + bookId + ' .editable').attr('contenteditable', 'true');
			// displays the editable fields as editable
			$('#' + bookId + ' .editable').addClass('editField');
			// removes the look of clickable content
			$('#' + bookId + ' .editable').addClass('noLinking');
		};
		// click on saveButton validates the fields and saves to db
		$scope.saveBook = function(bookId) {
			$('.errorMessage').remove(); // remove error messages
			var hasError = false; // validate book fields
			var review = $('#' + bookId + ' .review').html(); // get review
			var title = $('#' + bookId + ' .title').html(); // get title
			var grade = $('#' + bookId + ' .grade').html(); // get grade
			var author = $('#' + bookId + ' .author').html(); // get author
			var genre = $('#' + bookId + ' .genre').html(); // get genre
			var done = $('#' + bookId + ' .done').html(); // get doneDate
			// validate title
			if (validateTitle(title) == false) {
				$('<p class="errorMessage">Ange bokens titel</p>'). insertAfter('#' + bookId + ' .title');
				hasError = true;
			}
			// validate grade
			if (validateGrade(grade) == false) {
				$('#' + bookId + ' .gradeContainer').append('<p class="errorMessage">Ange ett betyg mellan 1 och 10</p>');
				hasError = true;
			}
			// validate author
			if (validateAuthor(author) == false) {
				$('#' + bookId + ' .authorContainer').append('<p class="errorMessage">Ange bokens författare</p>');
				hasError = true;
			}
			// validate genre
			if (validateGenre(genre) == false) {
				$('#' + bookId + ' .genreContainer').append('<p class="errorMessage">Ange bokens genre</p>');
				hasError = true;
			}
			// validate doneDate
			if (validateDate(done) == false) {
				$('#' + bookId + ' .doneContainer').append('<p class="errorMessage">Ogiltigt datumformat (åååå-mm-dd)</p>');
				hasError = true;
			}
			// if there is no validation errors, save the data to the db
			if (hasError == false) {
				$http.put('https://sape-i-heart-books.herokuapp.com/api/update/' + bookId, {
					title: title,
					grade: grade,
					author: author,
					review: review,
					genre: genre,
					done: done
				}).success(function(res){
					// makes the book fields not editable
					$('#' + bookId + ' .editable').attr('contenteditable', 'false');
					// hide the saveButton
					$('#' + bookId + ' .saveButton').hide();
					//show the editButton
					$('#' + bookId + ' .editButton').show();
					// get updated booklist from api
					$http.get('http://localhost:3000/api/books/' + user).success(function(data){
						$scope.bookList = data;
					});
					// show message
					var msg = 'Boken har uppdaterats!';
					showMessage(msg);
				});
			}
		};
		// click on deleteButton confirms the action and deletes from db
		$scope.deleteBook = function(bookId) {
			if (confirm("Är du säker på att du vill radera boken från din lista?")) {
				$http.delete('https://sape-i-heart-books.herokuapp.com/api/update/' + bookId).success(function(res){
					// get updated booklist from api
					$http.get('https://sape-i-heart-books.herokuapp.com/api/books/' + user).success(function(data){
						$scope.bookList = data;
					});
					// show message
					var msg = 'Boken har raderats!';
					showMessage(msg);
				});
			}
		};
	});