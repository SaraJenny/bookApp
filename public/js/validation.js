function validateTitle(title) {
	// check if title is empty
	if (title == '' || title == null) {
		return false;
	}
	return true;
}

function validateGrade(grade) {
	// check if grade is a number
	if (isNaN(grade) == true) {
		return false;
	}
	else {
		// check if grade is a number between 1 and 10
		if(grade < 0 || grade > 10) {
			return false;
		}
		return true;
	}
}

function validateAuthor(author) {
	// check if author is empty
	if (author == false || author == null) {
		return false;
	}
	return true;
}

function validateGenre(genre) {
	// check if genre is empty
	if (genre == '' || genre == null) {
		return false;
	}
	return true;
}

/* function that checks if a date is a valid date in the format yyyy-mm-dd */
function validateDate(dateString) {
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	if(dateString == null || !dateString.match(regEx)) {
		return false;  // Invalid format
	}
	var d;
	if(!((d = new Date(dateString))|0)) {
		return false; // Invalid date (or this could be epoch)
	}
	return d.toISOString().slice(0,10) == dateString;
}

function validateFirstname(firstname) {
	// check if firstname is empty
	if (firstname == '') {
		return false;
	}
	return true;
}

function validateLastname(lastname) {
	// check if lastame is empty
	if (lastname == '') {
		return false;
	}
	return true;
}

function validateEmail(email) {
	// check if lastname is empty
	if (email == '') {
		return false;
	}
	else {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		// check if email format is correct
        if (emailReg.test(email) != true) {
        	return false;
        }
        return true;
	}
}

function validatePassword(password) {
	// check if password is empty or contains less than 6 characters
	if (password == '' || password.length < 6) {
		return false;
	}
	return true;
}

// show success message
function showMessage(msg) {
    $('<div class="successMessage">' + msg + '</div>').insertBefore('#mainContent').delay(2000).fadeOut(function(){
        $(this).remove(); 
    });
    var screenTop = $(document).scrollTop();
    var elwidth = $('body').width();
    var styles = {
        position: 'absolute',
        top: screenTop,
        left: 0,
        'width': elwidth
    };
    $('.successMessage').css(styles);
    $('.successMessage').click(function() {
        $('.successMessage').remove();
    });
}
// show error message
function showError(msg) {
    $('<div class="errorMessageAlert">' + msg + '</div>').insertBefore('header').delay(5000).fadeOut(function(){
        $(this).remove(); 
    });
    var screenTop = $(document).scrollTop();
    var elwidth = $('body').width();
    var styles = {
        position: 'absolute',
        top: screenTop,
        left: 0,
        'width': elwidth
    };
    $('.errorMessageAlert').css(styles);
    $('.errorMessageAlert').click(function() {
        $('.errorMessageAlert').remove();
    });
}
