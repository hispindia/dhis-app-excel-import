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

            if (endpointName == "trackedEntityInstances"){
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
                if (error){

                }else{
                    if (response.httpStatusCode){
                        save("POST");
                    }else{
                        save("PUT");
                    }
                }
            }

            importData(index+1,data,endpointName,notificationCallback);

            function save(type){
                ajax.request( {
                    type: type,
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