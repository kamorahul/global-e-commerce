/**
 * Created by rahul on 21/12/15.
 */
var DBCon = {}
var self = require('./Schema');
var CONSTANT = require('./constant.js');
var MongoClient = require('mongodb').MongoClient;
var q = require('q');
var connectionString = CONSTANT.url ? CONSTANT.url : " mongodb://localhost:27017/shopindia";

var DB = function(db){
    this.db = db
}
exports.insert = function(query,db){
    var Q = q.defer();
    console.log("reached over Here")
    //var db = this.db;
    if(query.collection.length > 0){
        db.collection(query.collection).insertOne(query.insert,function(err,data){
               if(err){
                   Q.reject(new Error("Query not Done with Erorr"+err.message))
               }
            console.log("Data By the Mongo Insert >> >>> >>> "+data)
            Q.resolve(data);
        });
    }
    return Q.promise;
};
exports.find = function(query,db){
    var queryI = query.query? query.query : {};
    //console.log(
    //   query,db
    //);
    var Q = q.defer();
    if(query.collection.length > 0){
        var result = []
        db.collection(query.collection).find(queryI).toArray(function(err,data){
            if(err){
                Q.reject();
                return;
            }
            else{
                console.log(data)
                Q.resolve(data)
            }
        })
    }
    return Q.promise
};
exports.update = function(query,db){
    var Q = q.defer();
    console.log("reached over Here")
    if(query.collection.length > 0){
        db.collection(query.collection).updateOne(query.insert,function(err,data){
               if(err){
                   Q.reject(new Error("Query not Done with Erorr"+err.message))
               }
            console.log("Data By the Mongo Insert >> >>> >>> "+data)
            Q.resolve(data);
        });
    }
    return Q.promise;
};



exports.connectToMongo =  function (url){
    url = url ? url :connectionString;
    var Q = q.defer();
    //if(DBCon[url]){
    //    Q.resolve(DBCon[url]);
    //    return Q.promise();
    //}
    MongoClient.connect(url,function(err,dbShopIndia){
        if(err){
            console.log("DB Connection Issue with message"+err.stack);
            Q.reject(new Error(err.message));
        }
        //console.log("Ohhhhhh1111111")
        DBCon[url] = dbShopIndia;
        Q.resolve(DBCon[url]);
    });
    return Q.promise;
};

function insertData() {
    return self.connectToMongo().then(function (mongoDB) {
        //var dbForQuery = DB(mongoDB)
        console.log("Ohhhhhh")
      return  self.insert({
            "collection": "users",
            "insert": {
                username: "arun goyat",
                password: "ar",
                type: "admin",
                userid: "arun"
            }
        },mongoDB);
    }).then(function (data) {
        console.log(data)
        return data
    });
}
function findData() {
    return self.connectToMongo().then(function (mongoDB) {
        //var dbForQuery = DB(mongoDB)
        console.log("Ohhhhhh")
      return  self.find({
            "collection": "users",
            "query":{
                "userid":"arun"
            }
        },mongoDB);
    }).then(function (data) {
        console.log(data)
        return data
    });
}
//var data = insertData()
//setTimeout(function(){
//    console.log(JSON.stringify(data))
//},500)
