'use strict'

function clickHandler(db){
    
    var clicks = db.collection('clicks');
    
    this.getClicks = function(req, res){
        
        var clickProjection = {'_id' : false}; // trim '_id' property when get result
        
        clicks.findOne({}, clickProjection, function(err, result){ // findOne only get one document
            if(err){
                throw err;
            }
            
            if(result){
                res.json(result);
            }
            else{
                clicks.insert({'clicks' : 0}, function(err){
                    if(err){
                        throw err;
                    }
                    
                    clicks.findOne({}, clickProjection, function(err, doc){
                       if(err){
                           throw err;
                       }
                       
                       res.json(doc);
                    });
                });
            }
        });
    };
}

module.exports = clickHandler;