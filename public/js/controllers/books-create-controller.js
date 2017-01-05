angular.module('BookApp')
	.controller('BooksCreateController', function($scope, $http, $location) {
		var user = localStorage.user;
		// if user is not logged in, send to login page
		if (user == null) {
			$location.path('/login');
		}
		// click on addButton validates the fields and saves to db
		$scope.addBook = function() {
			$('.errorMessage').remove(); // remove error messages
			var hasError = false; // validate book fields
			var done = $('#done').val(); // get done date

			// validate title
			if (validateTitle($scope.title) == false) {
				$('<p class="errorMessage">Ange bokens titel</p>'). insertAfter('#title');
				hasError = true;
			}
			// validate author
			if (validateAuthor($scope.author) == false) {
				$('<p class="errorMessage">Ange bokens författare</p>').insertAfter('#author');
				hasError = true;
			}
			// validate grade
			if (validateGrade($scope.grade) == false) {
				$('.gradeContainer').append('<p class="errorMessage">Ange ett betyg mellan 0 och 10</p>');
				hasError = true;
			}
			// validate genre
			if (validateGenre($scope.genre) == false) {
				$('<p class="errorMessage">Ange bokens genre</p>').insertAfter('#genre');
				hasError = true;
			}
			// validate doneDate
			if (validateDate(done) == false) {
				$('<p class="errorMessage">Ogiltigt datumformat (åååå-mm-dd)</p>').insertAfter('#done');
				hasError = true;
			}
			// if there is no validation errors, save the data to the db
			if (hasError == false) {
		    	$http({
			        url: 'https://sape-i-heart-books.herokuapp.com/api/books/' + user,
			        method: 'PUT',
			        data: { 
			            title: $scope.title,
			            author: $scope.author,
			            grade: $scope.grade,
			            genre: $scope.genre,
			            review: $scope.review,
			            done: $scope.done
			        }
			    })
			    .then(function(res) {                
	                // empty form fields
	                $scope.title = null;
	                $scope.author = null;
	                $scope.grade = null;
	                $scope.genre = null;
	                $scope.review = null;
	                $scope.done = null;
	                // redirect to the booklist
	                $location.path('/');
					// show message
					var msg = 'Boken har lagts till!';
					showMessage(msg);
			    }, 
			    function(res) { 
					// show error message
					var msg = 'Tyvärr, ett fel uppstod och boken kunde inte läggas till.';
					showError(msg);
			    });
			}
		}
	});