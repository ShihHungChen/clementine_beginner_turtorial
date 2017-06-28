'use strict'

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js' )

exports = module.exports = function(app, passport){
  
  function isLoggedIn(req, res, next){
  	if(req.isAuthenticated()){ // isAuthenticated() is a passport method
  		return next();
  	}
  	else{
  		res.redirect('/login');
  	}
  }
  
  app.route('/').get(isLoggedIn, function(req, res){
  	res.sendFile(path = '/public/index.html');
  });
  
  app.route('/login').get(function(req , res){
  	res.sendFile(path + '/public/login.html');
  });

  app.route('/logout').get(function(req, res){

  	// passport includes on the req object, 
  	// this function will remove the req.uesr and clear out any sessions that are present
  	req.logout();

  	res.redirect('/login');
  });

  app.route('/profile').get(isLoggedIn, function(req, res){
  	res.sendFile(path + '/public/profile.html');
  });

  app.route('/api/:id').get(isLoggedIn, function(req, res){
  	res.json(req.user.github);
  });

  app.route('/auth/github').get(passport.authenticate('github', {
  	successRedirect: '/',
  	failureRedirect: '/login'
  }));

  var clickHandler = new ClickHandler();

  app.route('/api/:id/clicks')
                   .get(isLoggedIn, clickHandler.getClicks)
                   .post(isLoggedIn ,clickHandler.addClicks)
                   .delete(isLoggedIn ,clickHandler.resetClicks);
};