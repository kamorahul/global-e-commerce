/*
* pl.users
* username : String
* password : String
* user_id : String
* user_type : String
*
* */

var q = require('q');



exports.Schema = function(params){

    params.username  = params.username ?  params.username : "";
    params.password = params.password  ?  params.password  : "";
    params.user_id   = params.user_id ?  params.user_id : "";
    params.user_type   = params.user_type ?  params.user_type : "";
    return params;
}

