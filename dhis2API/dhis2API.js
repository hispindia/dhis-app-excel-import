/**
 * Created by harsh on 15/12/16.
 */

var APIx = {};

APIx.schemaNameToObjectMap = undefined;

APIx.dhis2API = function(){

    var ajax = require('../ajax-wrapper');
    var utility = require('../utility-functions');
    var Promise = require('bluebird');
    var CONSTANTS = require('./constants');

    var baseURL = "../../";
    var schemaNameToObjectMap = [];
    var ROOT_OU_UID = undefined;

    if (!APIx.schemaNameToObjectMap){
        init();
    }else{
        schemaNameToObjectMap= APIx.schemaNameToObjectMap;
    }

    function init() {

        ajax.request( {
            type: "GET",
            async: true,
            contentType: "application/json",
            url: baseURL + '/organisationUnits?level=1&fields=id,name'
        }, function(error,response){
            if (error){
                console.log("root ou error");
            }else{
                ROOT_OU_UID = response.organisationUnits[0].id;
            }
        });

        ajax.request( {
                type: "GET",
                async: true,
                contentType: "application/json",
                url: baseURL + 'schemas?fields=name,relativeApiEndpoint,apiEndpoint,properties[fieldName,required,simple,writable,propertyType,collection]'
            }, populateSchemaMaps);
    }

    function populateSchemaMaps(error, response, body) {
        if (error){

        }else{
            var schemas = response.schemas;
            schemaNameToObjectMap = buildSchemaMap(schemas,CONSTANTS.schemas_extended);
            APIx.schemaNameToObjectMap = schemaNameToObjectMap;
        }

        function buildSchemaMap(_schemas,extendedSchema){

            var merge = require('deepmerge');

            var schemas = {};
            for (var key in _schemas){
                var properties = {};
                for (var pKey in _schemas[key].properties){
                    properties[_schemas[key].properties[pKey].fieldName] = _schemas[key].properties[pKey];
                }

                _schemas[key].properties = properties;
                schemas[_schemas[key].name] = _schemas[key];
            }

            return merge(schemas,extendedSchema);
        }
    }

    this.save = function(domain,apiObject,_callback){
            ajax.request({
                type: "POST",
                async: true,
                contentType: "application/json",
                data : JSON.stringify(apiObject),
                url: "../../"+domain+"s"
            },callback);

        function callback(error,response,body){
            _callback(error,response,body);
        }

    }

    this.update = function(domain,uid,apiObject,_callback){
        if (uid){
            ajax.request({
                type: "PUT",
                async: true,
                contentType: "application/json",
                data : JSON.stringify(apiObject),
                url: "../../"+domain+"s/"+uid
            },callback);

        }

        function callback(error,response,body){
           _callback(error,response,body);
        }

    }
    this.getCustomObject = function(_retriever,...args){
        if (this[_retriever]){
            this[_retriever](...args);
        }
    }

    this.CONSTANTS = CONSTANTS;

    this.getSchemaNameToObjectMap = function(){
        return schemaNameToObjectMap;
    }

    this.getEndPointByDomain = function(domain){
        return schemaNameToObjectMap[domain].apiEndpoint;
    }

    this.getEventByDV = function(args,deuid,value,teiuid,ouuid,psuid){

        ajax.request({
            type: "GET",
            async: true,
            contentType: "application/json",
            url: "../../events?"+'ou='+ouuid+'&ouMode=SELECTED&programStage='+psuid+'&trackedEntityInstance='+teiuid
        },callback);

        function callback(error,response){
            if (error){
                args.then(error,response);
            }else{
                var events = response.events;
                var filteredEvents = [];
                for (var key in events){
                    var dvs = events[key].dataValues;

                    for (var i=0;i<dvs.length;i++){
                        if (dvs[i].dataElement == deuid){
                            if (dvs[i].value == value){
                                filteredEvents.push(events[key]);
                                break;
                            }
                        }
                    }
                }

             args.then(null,filteredEvents);
            }
        }
    }
    this.getTEIByAttr = function(args,attruid,value){
        ajax.request({
            type: "GET",
            async: true,
            contentType: "application/json",
            url: "../../trackedEntityInstances?"+'ou='+ROOT_OU_UID+'&ouMode=DESCENDANTS&filter='+attruid+':eq:'+value
        },callback);

        function callback(error, response, body){
            if (error){
                args.afterThat(true,null);
            }else{

                var uid = undefined;
                if (response.trackedEntityInstances.length>0){
                    uid = response.trackedEntityInstances[0].trackedEntityInstance;
                }
                args.afterThat(null,uid,response.trackedEntityInstances[0]);
            }
        }
    }
    this.getObjByField = function(args,domain,fieldName,fieldValue){

        ajax.request({
            type: "GET",
            async: true,
            contentType: "application/json",
            url: this.getEndPointByDomain(domain)+'?filter='+fieldName+':eq:'+fieldValue
        },callback);

        function callback(error, response, body){
            if (error){
                args.afterThat(true,null);
            }else{
                var uid = undefined;
                if (response[domain+'s'].length>0){
                    uid = response[domain+'s'][0].id;
                }
                args.afterThat(null,uid);
            }

        }
    }

     this.getConflicts = function(response){

        if (response.responseText){

            if (!utility.isJson(response.responseText))
                return ([{object:"Unexpected Error Occurred",value:response.responseText}]);

            var jsonRT = JSON.parse(response.responseText);

            if (jsonRT.response){
                if (jsonRT.response.conflicts){
                    return jsonRT.response.conflicts;
                }
                if (jsonRT.response.importSummaries[0].conflicts){
                    return jsonRT.response.importSummaries[0].conflicts;
                }
                if (jsonRT.response.importSummaries[0].status == "ERROR"){
                    return ([{object:jsonRT.response.importSummaries[0].description,value:""}]);
                }
            }
        }else{
            if (response.httpStatus){
                if (response.httpStatus.response)
                    if (response.httpStatus.response.conflicts){
                        return response.httpStatus.response.conflicts;
                    }
            }
        }

        if (response.conflicts)
            return response.conflicts;

        if (response.importConflicts)
            return response.importConflicts;

        return false;
    }

     this.findReference = function(response){

        if (response.response){

            if (response.response.reference){
                return response.response.reference;
            }

            if (response.response.importSummaries ){
                if (response.response.importSummaries[0].reference)
                    return response.response.importSummaries[0].reference;
            }
        }

        if (response.lastImported){
            return response.lastImported;
        }
        return "";
    }

    this.findStatus = function(response){

        if (response.statusText){
            return response.statusText
        }

        if (response.status){
            return response.status
        }

        return "";
    }

}


module.exports = APIx.dhis2API;