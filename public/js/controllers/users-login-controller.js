angular.module('BookApp')
	.controller('UsersLoginController', function($scope, $http, $location) {
		var user = localStorage.user; // get user-id
		// check if the user is already logged in and redirect to the start
		if (user != null) {
			$location.path('/books');
		}
		// validate user login
		$scope.loginUser = function() {
			$('.errorMessage').remove(); // remove error messages
			var hasError = false; // validate fields
			// check if email is empty
			if (!$scope.email) {
				$('<p class="errorMessage">E-post saknas</p>').insertAfter('#email');
				hasError = true;
			}
			// check if password is empty
			if (!$scope.password) {
				$('<p class="errorMessage">Lösenord saknas</p>').insertAfter('#password');
				hasError = true;
			}
			// if there's no errors, check if the email exists in the db
			if (hasError == false) {
				// get user from api
				$http.get('http://localhost:3000/api/user/' + $scope.email).success(function(data){
					// if the email doesn't exist in the db
					if (data == null) {
						$('<p class="errorMessage">Felaktig e-post</p>').insertAfter('#email');
					}
					else {
						// check if the password is the same as in the db
						if (data.password == $scope.password) {
							localStorage.setItem("user", data._id); // set localStorage
							$location.path('/books'); // redirect to start page
						}
						// if the password is incorrect
						else {
							$('<p class="errorMessage">Felaktigt lösenord</p>').insertAfter('#password');
						}
					}
				});
			}
		};
	});
