/**
 * Created by rahul on 24/12/15.
 */
/*
* Working on the basis of SI_connections
* */

var db = require('./DB');
var match = /\/admin\D+/;

exports.validate = function(req,res,next){
        var reqPath  =  req.path || null;
    console.log("reqPath >>> >>> >>>> ",reqPath)
    console.log("reqPath >>> >>> >>>> ",match.test(reqPath))
    var token = (req.cookies && req.cookies.token) ? req.cookies.token : null;
    console.log("token >>> >>> >>>> ",token)

    if(match.test(req.path)){
        if(token != null){
            return validateToken(token,req).then(function(result){

                if(result && result[0].username){
                    //req.path = "/admin/home"
                    //res.redirect('/admin/home')
                    next()
                }
                else{
                    res.clearCookie("token");
                    console.log("2")
                    res.redirect('/admin')

                    //req.path = '/admin'
                    //next()
                }
            })
        }
        else{
            console.log("3")

            res.redirect('/admin')

        }
    }
    console.log("4")
    next()
};

function validateToken(token,req){
   return db.find({
       "collection":"pl.connections",
       "query":{
           token : token
       }
   }).then(function(result){
    if(result && result[0].token ){
        req.username  = result[0].username

        return result
    }
    return false
})
}


