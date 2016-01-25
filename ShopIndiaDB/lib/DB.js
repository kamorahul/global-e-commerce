/**
 * Created by rahul on 21/12/15.
 */
var MongoQuery  = require('./Schema');
var Function = require('./function');
var q = require('q');

/*
 * @param {query} object
 * @params query.collection{String}{mandate}
 * @params query.query {object} {mandate}
 * @return string {_id}
 * */

exports.insert = function(query){
    console.log("inside DB")
    return MongoQuery.connectToMongo().then(function(db){
        console.log("mongo connection Done")
         return MongoQuery.insert(query,db);
    })
};
exports.find = function(query){
    return MongoQuery.connectToMongo().then(function(db){
         return MongoQuery.find(query,db);
    })
};
exports.update = function(query){
    return MongoQuery.connectToMongo().then(function(db){
         return MongoQuery.update(query,db);
    })
};


/*
 * @param {option} object
 * @params option.functionId {String}{mandate}
 * @params option.path {String} {mandate}
 * @return boolen {true|false}
 * */

exports.execute = Function.execute;



exports.saveFunction = Function.saveFunction;
