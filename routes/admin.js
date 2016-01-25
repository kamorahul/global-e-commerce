/**
 * Created by rahul on 21/12/15.
 */

var express = require('express');
var q = require('q')
var router = express.Router();
var Util = require('./Util');
var db = require('../ShopIndiaDB');
var ObjectID = require("mongodb").ObjectID
var paramsProvided = {}
var renderData=  {}

/* GET Admin page. */
router.all('/', function(req, res) {

    return Util.getRequestParams(req).then(function(params){
        paramsProvided = params;
        console.log("data >> >>> >>> >>",JSON.stringify(params))
        if(params.hasOwnProperty('username') &&params.hasOwnProperty('password')  ){
            console.log("data >> >>> >>> >>",params)

            return validateUser(params)
        }
    }).then(function(data) {
        console.log("data >> >>> >>> >>", data)
        if(data){

            console.log("page required>> >>> ")

            return saveUserConnection(paramsProvided,res)
            //res.render('LoginAdmin', { title: 'Welcome :: Shop India' ,error:"",username:"",password:""});

            //todo page for valid user
        }
        else{
            renderData.error = 'Wrong credential'
            renderData.title = "Welcome :: Shop India"
            renderData.username = ""
            res.render('LoginAdmin', renderData);

        }
    }).then(function(result){
        if(result){
            console.log("result >>>>>>>> > >> > > > >",JSON.stringify(result))
            req.path = "/admin/home"
            res.redirect('/admin/home')
        }

    })




})
router.all('/home',function(req,res){
    renderData.title =  'Welcome :: Shop India'
    renderData.error=  ''
    renderData.username = req.username ? req.username : "";
        res.render('DashboardAdmin',renderData );
});


router.all('/users',function(req,res){
    renderData.dataToDisplay = []
    return db.find({
        "collection":"pl.users",
        "query":{



        }
    }).then(function(data){
        console.log(JSON.stringify(data))
        renderData.dataToDisplay = data
        renderData.title =  'Welcome :: Shop India'
        renderData.error=  ''
        renderData.username = req.username ? req.username : "";

        res.render("AdminUsers",renderData);

    })

})

/*
* User Edit Route
* */

router.all('/users/edit',function(req,res){
    return Util.getRequestParams(req).then(function(params){
       return db.execute('AdminManagemant.AdminUpdate',params).then(function(result){
           res.render('AddAdmin',result);



       })


    })


})

function validateUser(params){
        console.log("params >> >>> >>> >> ",params)
    if(params && params.username && params.password){
      return  db.find({
            collection:"pl.users",
          "query":{
              "username":params.username

          }


        }).then(function(data){
            console.log("data.result >> >>> >>> ",data)
            if(data && data[0] && data.length > 0){
                 renderData.username = data[0].username;
                return true

            }
          else {
                return false
            }
        })
    }

}

function saveUserConnection(params,res){
    //var D = q.defer()
    console.log(params)
   var token  = genrateToken()
    res.cookie("token",token)

        return db.insert({
            "collection":"pl.connections",
            "insert":{
                token :token,
                username:params.username,
                "login_time":new Date()

            }


        })


    .then(function(result){
        console.log(2)

        console.log("result")
        return result;

    })

}


function genrateToken(){

    //console.log("token >>> >>> >>>> >")
      return require("crypto").createHash('sha1').update(ObjectID().toString()).digest("hex")
    //console.log(token)
    //
    //D.resolve(token)
    //return D.promise

}
module.exports = router;
