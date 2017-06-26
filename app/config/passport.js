'use strict'

var GithubStrategy = require('passport-github').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

exports = module.exports = function(passport){
	passport.serializeUser(fnuction(user, done){ // done is a native function native to Passport module
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});
};