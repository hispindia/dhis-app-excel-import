/**
 * Created by harsh on 9/1/17.
 */

var ajax = require('../ajax-wrapper');

export function trackerDataHandler(data,notificationCallback){
    var baseURL = "../../";
    var runningCount = new getRunningNumber();
    jsonImport();

    function jsonImport(){

        importData(0,data.trackedEntityInstance,"trackedEntityInstances",notificationCallback);

        function importRest(flag){
            if (flag != "trackedEntityInstances"){
                return;
            }
          //  debugger
            importData(0,data.enrollments,"enrollments",notificationCallback);
            importData(0,data.events,"events",notificationCallback);
        }

        function importData(index,data,endpointName,notificationCallback){
            if (index == data.length){
                importRest(endpointName);
                return
            }
            var dataObj = data[index];
            var uid;
//debugger
            if (endpointName == "trackedEntityInstances"){
               // debugger
                uid = dataObj.trackedEntityInstance;
            }else if (endpointName == "enrollments"){
                uid = dataObj.enrollment;
            }else if (endpointName == "events"){
                uid = dataObj.event;
            }

            ajax.request( {
                type: "GET",
                async: true,
                contentType: "application/json",
                url: baseURL + endpointName+"/"+uid
            }, getCallback);

            function getCallback(error,response,body){
                if (error) {
                    var obj = JSON.parse(response.responseText);
                    if (obj.httpStatusCode){
                        savePost();
                    }

                }
              /*  else {
                    var obj = JSON.parse(response.responseText);
                    if (obj.httpStatusCode) {
                        savePost();
                    } else {
                        savePut();
                    }
                }*/
                else{
                    if(response.responseText !=undefined){
                        var obj = JSON.parse(response.responseText);
                        if (obj.httpStatusCode) {
                            savePost();
                        }

                        else {
                            savePut();
                    }
                    }
                    else{
                        savePut();
                    }

                }
            }

            importData(index+1,data,endpointName,notificationCallback);

            function savePost(){
                ajax.request( {
                    type: "POST",
                    async: true,
                    contentType: "application/json",
                    url: baseURL + endpointName,
                    data : JSON.stringify(dataObj)
                }, saveCallback);

                function saveCallback(error,response,body){

                notificationCallback(error,response,{
                    domain_key : endpointName
                },runningCount.getNo());
                }
            }

            function savePut(){
                ajax.request( {
                    type: "PUT",
                    async: true,
                    contentType: "application/json",
                    url: baseURL + endpointName+"/"+uid,
                    data : JSON.stringify(dataObj)
                }, saveCallback);

                function saveCallback(error,response,body){

                    notificationCallback(error,response,{
                        domain_key : endpointName
                    },runningCount.getNo());
                }
            }
        }
    }
}

function getRunningNumber(){
    var number = 0;

    this.getNo = function(){
        return number++;
    }
}