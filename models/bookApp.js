// include packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema for BookApp
var BookAppSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: String,
    lastname: String,
    books: [
    	{
    		title: {
                type: String,
                required: true
            },
    		author: {
                type: String,
                required: true
            },
    		grade: {
                type: Number,
                required: true
            },
    		genre: {
                type: String,
                required: true
            },
    		review: String,
    		done: Date,
    		edited: {
                type: Date, default: Date.now
            }
    	}
    ]
});

module.exports = mongoose.model('BookApp', BookAppSchema);