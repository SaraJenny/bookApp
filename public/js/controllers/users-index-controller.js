angular.module('BookApp')
	.controller('UsersIndexController', function($scope, $http, $location) {
		var user = localStorage.user;
		// if user is not logged in, send to login page
		if (user == null) {
			$location.path('/login');
		}
		else {
			// get booklist from api
			$http.get('https://sape-i-heart-books.herokuapp.com/api/books/' + user).success(function(data){
				$scope.bookList = data;
				$scope.firstname = data.firstname; // assign value to ng-model firstname
				$scope.lastname = data.lastname; // assign value to ng-model lastname
				$scope.email = data.email; // assign value to ng-model email
				$scope.password = data.password; // assign value to ng-model password
			});
		}
		// click on saveButton validates the fields and saves to db
		$scope.saveUser = function() {
			$('.errorMessage').remove(); // remove error messages
			var hasError = false; // validate fields
			// validate firstname
			if (validateFirstname($scope.firstname) == false) {
				$('<p class="errorMessage">Fyll i förnamn</p>').insertAfter('#firstname');
				hasError = true;
			}
			// validate lastname
			if (validateLastname($scope.lastname) == false) {
				$('<p class="errorMessage">Fyll i efternamn</p>').insertAfter('#lastname');
				hasError = true;
			}
			// validate email
	        if (validateEmail($scope.email) == false) {
	            $('<p class="errorMessage">Ogiltigt e-postformat</p>').insertAfter('#email');
	            hasError = true;
	        }
	        // validate password
	        if (validatePassword($scope.password) == false) {
	        	$('<p class="errorMessage">Fyll i lösenord (minst 6 tecken)</p>').insertAfter('#password');
	        	hasError = true;
	        }
			// if there is no validation errors, save the data to the db
			if (hasError == false) {
				$http.put('https://sape-i-heart-books.herokuapp.com/api/users/' + user, {
					firstname: $scope.firstname,
					lastname: $scope.lastname,
					email: $scope.email,
					password: $scope.password
				}).success(function(res){
					// show message
					var msg = 'Uppgifterna har uppdaterats!';
					showMessage(msg);
				});
			}
		};
	});
