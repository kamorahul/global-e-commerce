/**
 * Created by rahul on 22/12/15.
 */
var q = require('q');
var self = require('./function');
var db = require('./DB');
var RESOLVE=  require('requirejs');
var schemaPath = /\/\w+\/\w+/;
var slash = /^\//;
 function resolveFunction(path){
    var Q = q.defer();
     path  = "./"+path+".js";
RESOLVE([path], function (data) {
        console.log( data);
    Q.resolve(data)

    })
    return Q.promise
}
function resolveSchema(path,params){
    var Q = q.defer();

     var schema_path =  "."+schemaPath.exec(path)[0]+"/Schema.js";
    console.log(schema_path)
     var Schema = require(schema_path);
    console.log(JSON.stringify(Schema))
     var paramsData =  Schema(params)
    Q.resolve(paramsData)
    return  Q.promise ;



    };

exports.execute = function(functionName,options){
         var index = functionName.indexOf('.');
         var functionId = functionName.substring(0,index);
         var functionToExecute =    functionName.substring(index+1);
        var result = []
            console.log(functionId,functionToExecute);
        return db.find({
        "collection":"pl.functions",
        "query":{
            function_id:functionId
        }
    }).then(function(resultPath){
            result = resultPath;
            console.log("result >>>>> >> >> > > "+result);
            var path = result[0].function_path+result[0].function_id;
            return resolveSchema(path,options)


        }).then(function(params){
            options = params;
            console.log(result);
            var path = result[0].function_path+result[0].function_id;
            return resolveFunction(path)


        }).then(function(resolvedFile){
            return resolvedFile[functionToExecute](options,db);
        })
};
exports.saveFunction = function(options)
{
    console.log("result");
    if(options.path.length > 0 && options.functionId.length > 0){
        return db.find({
            "collection":"pl.functions",
            "query":{
                "function_id":options.functionId
            }


        }).then(function(result){
            console.log(result)
            if(result.length > 0){
                return {"message":"Duplicate Key"}
            }
            else{
                console.log("reached");
                return db.insert({
                    "collection":"pl.functions",
                    "insert":{
                       "function_id":options.functionId,
                        "function_path":options.path
                    }
                })
            }
        }).then(function(result){

            console.log(result);
            return result;

        })
    }
}



//return resolveFunction('./fun.js').then(function(data){
//
//    //console.log(data)
//    //console.log('Resolving Done')
//data.name()
//
//})
//
//var options  = {
//    path:"ShopIndiaBL/AdminManagemant/",
//    functionId : "AdminManagemant"
//}
//return self.saveFunction(options)
//

//return self.execute("fun.name")