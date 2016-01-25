/**
 * Created by rahul on 24/12/15.
 */

var q = require('q')
exports.getRequestParams  = function(req){
    var Q = q.defer();
    var allParams = {}
    var params = req.params || {};
    var body = req.body || {};
    var query = req.query || {};
    for(key in params) {
        if (params.hasOwnProperty(key)) {
            allParams[key] = params[key];
        }
    }
    for(key in query) {
        if (query.hasOwnProperty(key)) {
            allParams[key] = query[key];
        }
    }
    for(key in body) {
        if(body.hasOwnProperty(key)){
            allParams[key] = body[key];
        }
    }
    console.log("allParams  >>>> >> >> >>> >",allParams)
    Q.resolve(allParams)
    return Q.promise


}