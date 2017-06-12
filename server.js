'use strict';

var express = require('express');

var app = express();

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/index.html'); // cwd -> current working directory
});

app.listen(8080, function(){
  console.log('Listening on port 8080...');
});