'use strict'

var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

exports = module.exports = function(passport){
	passport.serializeUser(function(user, done){ // done is a native function native to Passport module
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	},
	function(token, refreshToken, profile, done){ // verify callback
		process.nextTick(function(){ // nextTick -> will wait until the github api result
			User.findOne({'github.id':profile.id}, function(err, user){
				if(err){
					return done(err);
				}

				if(user){
					return done(null,user);
				}else{
					var newUser = new User();

					newUser.github.id = profile.id;
					newUser.guthub.username = profile.username;
					newUser.github.displayName = profile.displayName;
					newUser.github.publicRepos = profile._json.public_repos;
					newUser.nbrClicks.clicks = 0;

					newUser.save(function(err){
						if(err){
							throw err;
						}

						return done(null, newUser);
					})
				}
			})
		})
	}));
};