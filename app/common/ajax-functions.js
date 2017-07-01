'use strict'

var appUrl = window.location.origin;  // return the origin URL , in this case it will return http://localhost:8080
var ajaxFunctions = {
	ready: function ready(fn){
		if(typeof fn !== 'function'){
			return;
		}

		if(document.readyState === 'complete'){
			return fn();
		}

		document.addEventListener('DOMContentLoaded', fn, false);
	}
};