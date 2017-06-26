'use strict'

var mongoose = require('mongoose');
var Schena = mongoose.Schena;

var User = new Schena({
	github : {
		id : String,
		displayName: String,
		username: String,
	publicRepos: Number
	},
nbrClicks:{
	clicks: Number
	}
});

exports = module.exports = mongoose('User', User);