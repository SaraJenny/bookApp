angular.module('BookApp')
	.controller('BookController', function($scope, $location) {
		var user = localStorage.user;
		if (user == null) {
			$location.path('/login');
		}
		// toggle the menu
	    $scope.toggleMenu = function() {
	        $('#mainmenu ul').toggleClass('active');
	        var page = $location.path(); // get current page
	        page = page.substring(1); // remove first charachter (slash)
	        setCurrent(page); // show current page in menu
    	};
       	// send user to clicked location
       	$scope.goTo = function(page) {
    		$('#mainmenu ul').toggleClass('active');
    		setCurrent(page); // show current page in menu
       		$location.path(page);
       	};
    	// show current page in menu
    	function setCurrent(page) {
	    	$("#mainmenu p").each(function() {
				if ($(this).attr('data-ng-click') == "goTo('" + page + "')") {
					$(this).addClass("current");
				}
				else {
					$(this).removeClass("current");
				}
	    	});
       	}
       	// logout user
       	$scope.logoutUser = function() {
    		$('#mainmenu ul').toggleClass('active');
			localStorage.removeItem('user');
			// redirect to login
	        $location.path('/login');
       	};
	});