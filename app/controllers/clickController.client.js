'use strict';

(function(){
    var addButton = document.querySelector('.btn-add');
    var deleteButton = document.querySelector('.btn-delete');
    var clickNbr = document.querySelector('#click-nbr');
    //var apiUrl = 'https://clementine-beginner-tutorial-shihung.c9users.io/api/clicks';
    var apiUrl = 'http://localhost:3000/api/clicks';
    
    function ready (fn){
        if(typeof fn !== 'function'){
            return;
        }
    
    
    if(document.readyState === 'complete'){
        return fn();
    }
    
    
    document.addEventListener('DOMContentLoaded', fn, false);
    
    }
    
    function ajaxRequest (method, url, callback){
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function(){ // assign callback fnuction to the property
            if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
                callback(xmlhttp.response);
            }
        };
        
        xmlhttp.open(method, url, true); // if the 3rd argument set false, the javascript will hangs until the server response ref:http://www.w3school.com.cn/ajax/ajax_xmlhttprequest_send.asp
        xmlhttp.send();
    }
    
    function updateClickCount (data){
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
      
      console.log('update');
    };
    
    ready(ajaxRequest('GET', apiUrl, updateClickCount));
    
    console.log('here');
    
    addButton.addEventListener('click', function(){
        ajaxRequest('POST', apiUrl, function(){
            ajaxRequest('GET', apiUrl, updateClickCount)
        });
        
    }, false);
    
    deleteButton.addEventListener('click', function(){
        ajaxRequest('DELETE', apiUrl, function(){
            ajaxRequest('GET', apiUrl, updateClickCount)
        })
    }, false); // the 3rd decide capturing or bubbling of the method, ref : https://www.w3schools.com/jsref/met_element_addeventlistener.asp
    
})();