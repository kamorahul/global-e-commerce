/**
 * Created by root on 31/12/15.
 */


define([],function(){
    return {
        AdminUpdate:function(params,db){
            params = Schema(params)
            writeLog("params >> >>> >> > > ",params);
            if(params._id && !params.id ){
                writeLog("Reached !!!!");



            }


            return params;
        }



    }




})

 function  writeLog(log,log1){
    console.log(log,JSON.stringify(log1))


}

function Schema(params){
    return  require('./Schema')(params)



}