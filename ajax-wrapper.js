/**
 * Created by harsh on 15/12/16.
 */


var ajaXwrapper = function(){

    var $ = require('jquery');

    this.request = function(param,callback){
        param.success = success;
        param.error = error;
        $.ajax(param);

        function success(response){
            callback(null,response);
        }

        function error(response){
            callback(true,response);
        }
    }

}

module.exports = new ajaXwrapper();