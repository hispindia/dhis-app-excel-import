/**
 * Created by harsh on 29/12/16.
 */

var utility = require('../utility-functions');
import dhis2API from '../dhis2API/dhis2API';
import tagParser from './tag-parser';

export function importHandler(importable_obj,data,notificationCallback){

    var api = new dhis2API();
    var parser = new tagParser();
    var import_cases = assembleImportCases();

    singleSheetImport(import_cases._single_sheet);
    defaultImport(import_cases._default);

    function assembleImportCases(){
        var importMap = {
            _single_sheet :{
                trackedEntityInstance : [],
                enrollment : [],
                event : []
            },
            _default : [],
            _delete : []
        };

        var headersMapGrpByDomain = utility.prepareMapGroupedById(importable_obj.headers,"domain_key");

        for (var key in headersMapGrpByDomain){
            var domain_obj = headersMapGrpByDomain[key];

            if (importable_obj.inline){
                if (key == "trackedEntityInstance"){
                    importMap._single_sheet[key] = domain_obj;
                }else{
                    importMap._single_sheet[domain_obj[0].domain].push(domain_obj);
                }
            }else{
                importMap._default[key] = domain_obj;
            }
        }
       return importMap;
    }

    function singleSheetImport(ss){

        importTEIs(ss.trackedEntityInstance,data,0);
        var thiz = this;
        function importTEIs(headers,data,index){

            importTEI(headers,data[index],{ index: index,
                                            teiHeaders : headers,
                                            data : data,
                                            teiCallback : teiCallback.bind(thiz),
                                            importEvents : importEvents.bind(thiz),
                                            importTEI : importTEI,
                                            notificationCallback : notificationCallback
                                            });

            function teiCallback(error,response,body,args){
                importEnrollments(args,ss,data);
            }
        }

        function importEnrollments(args,ss,data){

            args.enrollmentHeaderLength = ss.enrollment.length;
            args.enrollmentIndex = 0;
            args.enrollmentCallback = enrollmentCallback.bind(this);

            importEnrollment(args.enrollmentIndex,ss.enrollment,data[args.index],args);

            function enrollmentCallback(error,response,body,args){

                importEnrollment(args.enrollmentIndex+1,ss.enrollment,data[args.index],args);

            }
        }

        function importEvents(args,data){

            args.eventHeaderLength = ss.event.length;
            args.eventIndex = 0;
            args.eventCallback = eventCallback.bind(this);

            importEvent(args.eventIndex,ss.event,data,args);

            function eventCallback(error,response,body,args){
                importEvent(args.eventIndex+1,ss.event,data,args);
            }
        }

    }

    function importEvent(eventIndex,headers,data,args){
        var thiz = this;
        if (eventIndex == args.eventHeaderLength){
            args.index = args.index+1;
            args.importTEI(args.teiHeaders,args.data[args.index],args);
            return;
        }

        var header = headers[eventIndex][0];
        var programStageHeader = parser.getHeaderbyField("programStage",headers[args.eventIndex]);
        var programStageUid = undefined;
            if (programStageHeader){
                programStageUid  = programStageHeader.args?programStageHeader.args : data[programStageHeader.key];
            }

        args.programStage = programStageUid;
        args.eventIndex =eventIndex;
        api.getCustomObject(parser.getRetriever(),{ afterThat : saveOrUpdate ,
                                                    teiApiObject : args.teiApiObject,
                                                    programStage : args.programStage},headers[eventIndex],data);

        function saveOrUpdate(error,response){
            if (error){
                notificationCallback(error,response,header,args.index);
            }else{
                var uid = undefined;
                if (response.domainObj){
                    uid = response.domainObj.trackedEntityInstance;
                }

                if (response.apiObj.trackedEntityInstance == "inline"){
                    response.apiObj.trackedEntityInstance = args.teiApiObject.trackedEntityInstance;
                }

                if (response.apiObj.orgUnit == "inline"){
                    response.apiObj.orgUnit = args.teiApiObject.orgUnit;
                }

                if (uid){
                    api.update(response.domain,uid,response.apiObj,callback.bind(thiz));
                }else{
                    api.save(response.domain,response.apiObj,callback.bind(thiz));
                }
            }
            function callback(error,response,body){
                notificationCallback(error,response,header,args.index);
                args.eventCallback(error,response,body,args);

            }
        }
    }

    function importEnrollment(enrollmentIndex,headers,data,args){
        var thiz = this;
        if (enrollmentIndex == args.enrollmentHeaderLength){

            args.importEvents(args,data);
            return;
        }

        var header = headers[enrollmentIndex][0];

        args.enrollmentIndex =enrollmentIndex;
        api.getCustomObject(parser.getRetriever(),{ afterThat : saveOrUpdate },headers[enrollmentIndex],data);

        function saveOrUpdate(error,response){
            if (error){
                notificationCallback(error,response,header,args.index);

            }else{
                var uid = undefined;
                if (response.domainObj){
                    uid = response.domainObj.trackedEntityInstance;
                }
                if (response.apiObj.trackedEntityInstance == "inline"){
                    response.apiObj.trackedEntityInstance = args.teiApiObject.trackedEntityInstance;
                }

                if (response.apiObj.orgUnit == "inline"){
                    response.apiObj.orgUnit = args.teiApiObject.orgUnit;
                }

                if (!uid){
                    api.save(response.domain,response.apiObj,callback.bind(thiz));
                }else{

                }
            }
            function callback(error,response,body){
                notificationCallback(error,response,header,args.index);
                args.enrollmentCallback(error,response,body,args);

            }
        }
    }

    function importTEI(headers,data,args){
        var thiz = this;
        var header = headers[0];
        if(args.index == args.data.length){
            debugger
            return;
        }

        api.getCustomObject(parser.getRetriever(),{ afterThat : saveOrUpdate },headers,data);

        function saveOrUpdate(error,response){
            if (error){
                notificationCallback(error,response,header,args.index);

            }else{
                args.teiApiObject = response.apiObj;

                var uid = undefined;
                if (response.domainObj){
                    uid = response.domainObj.trackedEntityInstance;
                    args.teiApiObject.trackedEntityInstance = uid;
                }
                args.then = args.teiCallback;

                if (uid){
                    api.update(response.domain,uid,response.apiObj,callback.bind(thiz));
                }else{
                    api.save(response.domain,response.apiObj,callback.bind(thiz));
                }
            }
            function callback(error,response,body){
                notificationCallback(error,response,header,args.index);
                args.teiCallback(error,response,body,args);

            }
        }
    }

    function defaultImport(domains){

    }
}