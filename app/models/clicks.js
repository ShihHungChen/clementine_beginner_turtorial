'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Clicks = new Schema(
	{ clicks : Number},
	{ versionKey : false}  // disable "__v" property that automatically added by mongoose
	);

// mongoose.model take two arguments
// the first is "singular" 
//     -> note : the document says mongoose will automatically search plural version of this argumnet
// the second argument is the name of Schema
exports = module.exports = mongoose.model('Clciks', Clicks); 