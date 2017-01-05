angular.module('BookApp')
	.config(function($routeProvider){
		$routeProvider

		.when('/books', {
			templateUrl: '/templates/pages/books/index.html',
			controller: 'BooksIndexController',
			controllerAs: 'indexCtrl'
		})

		.when('/create', {
			templateUrl: '/templates/pages/books/create.html',
			controller: 'BooksCreateController',
			controllerAs: 'createCtrl'
		})

		.when('/', {
			templateUrl: '/templates/pages/users/login.html',
			controller: 'UsersLoginController',
			controllerAs: 'loginCtrl'
		})

		.when('/user', {
			templateUrl: '/templates/pages/users/index.html',
			controller: 'UsersIndexController',
			controllerAs: 'indexCtrl'
		})

		.when('/login', {
			templateUrl: '/templates/pages/users/login.html',
			controller: 'UsersLoginController',
			controllerAs: 'loginCtrl'
		})

		.otherwise({ redirectTo: '/' });
});