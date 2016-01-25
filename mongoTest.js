/**
 * Created by root on 22/12/15.
 */
    var MongoClient = require('mongodb').MongoClient
//var insertDocument = function(db, callback) {
//    db.collection('restaurants').insertOne( {
//        "address" : {
//            "street" : "2 Avenue",
//            "zipcode" : "10075",
//            "building" : "1480",
//            "coord" : [ -73.9557413, 40.7720266 ]
//        },
//        "borough" : "Manhattan",
//        "cuisine" : "Italian",
//        "grades" : [
//            {
//                "date" : new Date("2014-10-01T00:00:00Z"),
//                "grade" : "A",
//                "score" : 11
//            },
//            {
//                "date" : new Date("2014-01-16T00:00:00Z"),
//                "grade" : "B",
//                "score" : 17
//            }
//        ],
//        "name" : "Vella",
//        "restaurant_id" : "41704620"
//    }, function(err, result) {
//
//        console.log("Inserted a document into the restaurants collection.");
//        callback(result);
//    });
//};

//MongoClient.connect("mongodb://localhost/test", function(err, db) {
//
//    insertDocument(db, function() {
//        db.close();
//    });
//});


//var findRestaurants = function(db, callback) {
//    var cursor =db.collection('restaurants').find( );
//    cursor.each(function(err, doc) {
//
//        if (doc != null) {
//            console.dir(doc);
//        } else {
//            callback();
//        }
//    });
//};

//MongoClient.connect("mongodb://localhost/test", function(err, db) {
//
//    findRestaurants(db, function() {
//        db.close();
//    });
//});


var db = require('./ShopIndiaDB');

return  db.find({
    collection:"pl.users",
    query:{"username":"rahul"}
}).then(function(data){

    console.log(data)

});
//console.log("reached")
//


//var path=  /\/[user|admin]./;
//console.log(path.test("/admin"));
//var ObjectID = require('mongodb').ObjectID
//console.log(ObjectID())
//function data() {
//    return require("crypto").createHash('sha1').update(ObjectID().toString()).digest("hex");
//}
//
//console.log("datadatadata  >>> >>  > > ",data())



//todo Token  validation logic

//var date = new Date(Date.now())
//console.log(date.getTime())
//
//setTimeout(function(){
//    var dateNew = new Date(Date.now())
//    console.log(dateNew.getTime())
//
//
//},5000)


//todo path detection

//var match = /\/admin\D+/;
//console.log(match.test('/admin/'))
//


//
////
//
//var exec = require('child_process').exec,
//    child;
//
//child = exec('gnome-terminal -x node &',
//    function (error, stdout, stderr) {
//        console.log('stdout: ' + stdout);
//        console.log('stderr: ' + stderr);
//        if (error !== null) {
//            console.log('exec error: ' + error);
//        }
//    });

//
//var regexp = /\/\w+\/\w+/;
////var slash = /^\//;
//var path = "/ShopIndiaBL/AdminManagemant/abdff/hgfjygfyfyf/ytftyfyt.js";
////var bool =  slash.test(path);
//var arr = regexp.exec(path);
//
//console.log(arr)
//console.log(bool)

//
//var regexp = /^\/\w+/
//
//console.log(regexp.test('/adytdyfjt'))