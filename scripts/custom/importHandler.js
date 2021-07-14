/**
 * Created by harsh on 9/5/16.
 */

function register(headers,importData,notificationCallBack){
    
     var trackedEntityInstances = [];
     var programStages = ["LOQYeWniuCM","I9QcUPzUzJZ"];
    var program ;

    for(var index=0;index<importData.length;index++){
       //looping throgh each line of data in excell sheet
        createTei(headers,index);
                    
    }
 
     function createTei(headers,index){
         var header;
        for(var key in headers){
            var domain = headers[key][0].domain;
            if(domain==DOMAIN_TEI){
                header = headers[key];
            }
        }
                
         //var index = 0;
         //var orgUnit = importData[index][header[getIndex(FIELD_ORG_UNIT,header)].key];
         var orgCode = importData[index][header[getIndex(FIELD_ORG_UNIT,header)].key];
        var orgUnit = getOuIdByCode(orgCode);

         var tei = new dhis2API.trackedEntityInstance();
         tei.excelImportPopulator(header, importData[index],orgUnit);
         tei.POST(teiSuccessCallback,teiFailedCallback,index,index,headers);
         trackedEntityInstances.push(tei);
     }
 
     function teiSuccessCallback(response,headers,teiHeaderKey){
        notificationCallBack(response);
         var index = response.importStat.index;
         //var teiID = response.response.reference;
         var teiID = response.response.importSummaries[0].reference;
         var tei = trackedEntityInstances[index];
         tei.trackedEntityInstance = teiID;
        
         var header;
         var lTeikey;
         if(teiHeaderKey){
             header = headers[teiHeaderKey];
             lTeikey = teiHeaderKey;
         }else{
            for(var key in headers){
                var domain = headers[key][0].domain;
                if(domain==DOMAIN_TEI){
                    header = headers[key];
                    lTeikey = key;
                    break;
                }
            }
         }
         
         

         if (response.status == "OK"){
            if (isProgramSpecified(header) ) {
                enroll(index,importData[index],headers,tei,lTeikey);
            }else{
                enroll(index,importData[index],headers,tei,lTeikey);
                console.log("Program no specified");
            }
        }
    }

     function teiFailedCallback(response){
        notificationCallBack(response);
        console.log(response);
     }

     function getIndex(field, header) {
        for (var i = 0; i < header.length; i++) {
            if (header[i].field == field) {
                return i;
            }
        }
        return undefined;
    }

    function isProgramSpecified(header) {
        for (var i = 0; i < header.length; i++) {
            if (header[i].domain == DOMAIN_TEI && header[i].field == FIELD_PROGRAM) {
                return true;
            }
        }
        return false;
    }

    function enroll(index, data, headers, tei,teiHeaderKey) {
        var header = headers[teiHeaderKey];
        var enrollment = new dhis2API.enrollment();

        var header;
        var lTeikey;
        if(teiHeaderKey){
            header = headers[teiHeaderKey];
            lTeikey = teiHeaderKey;
        }else{
           for(var key in headers){
               var domain = headers[key][0].domain;
               if(domain==DOMAIN_TEI){
                   header = headers[key];
                   lTeikey = key;
                   break;
               }
           }
        }

        enrollment.excelImportPopulatorTemp(header, data, tei,program);
        enrollment.POST(enrollmentSuccessCallback, enrollmentFailedCallback, index,headers);
        program = enrollment.program;
    }

    function enrollmentSuccessCallback(response,headers){
        notificationCallBack(response);
        console.log(response);
        var index = response.importStat.index;
        createEvent(headers,index);
    }

    function enrollmentFailedCallback(response){
        notificationCallBack(response);
        console.log(response);
    }

    function createEvent(header,index){
        var tei = trackedEntityInstances[index];
       
        var events= [];
        

        for(var key in headers){
            var domain = headers[key][0].domain;

            if(/ev\d{1,}/.test(domain)){
                events.push(createSingleEvent(headers[key],tei,program,index));
            }
  
        }

        var eventsCombined = new dhis2API.events();
        eventsCombined.populate(events);
        eventsCombined.POST(eventSuccessCallback,index);
    }

    function createSingleEvent(header,tei,program,index){
        var event = new dhis2API.event();
        event.excelImportPopulatorTemp(header,importData[index],tei);
        event.program = program;
        return event;
        //event.POST(eventSuccessCallback,eventSuccessCallback,index)
    }

    function eventSuccessCallback(response){
        notificationCallBack(response);
        console.log(response)
    }

    function getOuIdByCode(code) {
      //  var def = $.Deferred();
      var ouId = undefined;
        // var url= '../../organisationUnits?fields=id,name&filter=code:eq:' + code;
        // $.get(url, function (data) { 
        //         for(var key in data.organisationUnits)
        //         {
        //             ouId = data.organisationUnits[key].id;
        //             break;
        //         }
        //     });
        //     return ouId;

         $.ajax({
             type: "GET",
             dataType: "json",
             async : false,
             contentType: "application/json",
             url: '../../organisationUnits?fields=id,name&filter=code:eq:' + code,
             success: function (data) {
                 for(var key in data.organisationUnits)
                 {
                     ouId =  data.organisationUnits[key].id;
                     break;
                 }
                
             }
         });
         return ouId;
    }
 }

 /////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


function importHandler(headers,importData,notificationCallback) {
    var trackerSingleSheetCase = false;
    var teiSecondComingMap = [];
    var trackedEntityInstances = [];
    if(isTrackerSingleSheetCase()){
        handleMultiDomainCase();
        return;
    }

    for (var key in headers) {

        var domain = headers[key][0].domain;
        switch (domain) {
            case DOMAIN_TEI :
                importTEIs(headers[key]);
                break
            /*case DOMAIN_EVENT :
                importEvents(headers[key]);
                break*/
            case DOMAIN_EVENT1:
                importEvents(headers[key]);
                break
            case DOMAIN_EVENT2:
                importEvents(headers[key])
                break
            case DOMAIN_ENROLLMENT :
                enrollTEIs(headers[key]);
                break
            case DOMAIN_EVENT_DELETE :
                deleteEvents(headers[key]);
                break
            case DOMAIN_TEI_DELETE :
                deleteTEIs(headers[key]);
                break
            case DOMAIN_OU_DELETE :
                deleteOUs(headers[key]);
                break
            case DOMAIN_OU_UPDATE :
                updateOUs(headers[key]);
                break
            case DOMAIN_DVS :
                importDVS(headers[key]);
                break
            case DOMAIN_TEI_UPDATE :
                updateTEIs(headers[key]);
                break
            case DOMAIN_USER :
                importUsers(headers[key]);
                break
        }
    }

    function deleteEvents(header) {
        deleteEvent(0, importData, header);
    }

    function deleteEvent(index, data, header) {
        if (index == data.length) {
            return
        }

        var event = new dhis2API.event();
        var eventID = undefined;
        for (var i = 0; i < header.length; i++) {
            switch (header[i].field) {
                case FIELD_UID :
                    if (header[i].args) {
                        eventID = header[i].args;
                    } else {
                        eventID = data[index][header[i].key];
                    }
                    break;
            }
        }

        //  if (eventID)
        event.remove(eventID, index, callback);

        function callback(response) {
            notificationCallback(response)
            deleteEvent(response.importStat.index + 1, data, header);
        }
    }

    function importEvents(header,tei,index) {
        if (tei!=undefined){
            importEvent(index, importData, header, false,null,tei);
            return
        }
        var lookUpIndex = getIndex(FIELD_UID_LOOKUP_BY_ATTR, header);

        if (lookUpIndex) {
            importEvent(0, importData, header, true, lookUpIndex);
        } else {
            importEvent(0, importData, header, false);
        }

    }

    function importEvent(index, data, header, lookUpFlag, lookUpIndex,tei) {
        if (index == data.length) {
            return
        }

        if (lookUpFlag) {
            getTEIByAttr(ROOT_OU_UID, header[lookUpIndex].args, data[index][header[lookUpIndex].key]).then(function (tei) {

                var event = new dhis2API.event();
                event.excelImportPopulator(header, data[index], tei);
                event.POST(eventCallback, eventCallback, index);
            })
        } else if (tei){
            var event = new dhis2API.event();
            event.excelImportPopulator(header, data[index], tei);
            event.POST(eventCallback, eventCallback, index);
        }else {
            var event = new dhis2API.event();
            event.tei = trackedEntityInstances[index];
            event.excelImportPopulator(header, data[index],tei);
            event.POST(eventCallback, eventCallback, index);
        }

        function eventCallback(response) {
            notificationCallback(response);

            if (trackerSingleSheetCase) return;

            setTimeout(function () {
                importEvent(response.importStat.index + 1, importData, header, lookUpFlag, lookUpIndex);
            }, 0);
        }
    }

    function importTEIs(header) {

        var lookUpIndex = getIndex(FIELD_UID_LOOKUP_BY_CODE, header);

        if (lookUpIndex){
            importTEI(0, importData, header,true,lookUpIndex);
        }else{
            importTEI(0, importData, header,false);
        }
    }

    function importTEI(index, data, header, lookUpFlag, lookUpIndex) {
        var orgUnit;

        teiSecondComingMap[DOMAIN_TEI+index] = false;
        if (index == data.length) {
            return
        }

        if (lookUpFlag){

            var code = data[index][header[lookUpIndex].key];
           getOuByCode(code,lookUpIndex).then(function(orgUnits){
               // This has made refactoring absolutely necessary :(
                var lookUpIndex = orgUnits.lookUpIndex;
                var ouUid;
                if (orgUnits.organisationUnits.length >0){
                    ouUid = orgUnits.organisationUnits[0].id;
                }
                orgUnit = ouUid;

                var lookUpIndex2 = getIndex(FIELD_UID_LOOKUP_BY_ATTR, header);

                getTEIByAttr(ROOT_OU_UID, header[lookUpIndex2].args, data[index][header[lookUpIndex2].key],lookUpIndex,orgUnit).then(function (data_tei) {
                    var orgUnit = data_tei.orgUnit;
                    var lookUpIndex = data_tei.lookUpIndex;

                    if (data_tei.trackedEntityInstances.length > 0){
                        teiSecondComingMap[DOMAIN_TEI+index] = true;
                        updateTEI(index, importData, header, true, lookUpIndex2,requestCallback,lookUpIndex);

                    }else{
                        var tei = new dhis2API.trackedEntityInstance();
                        tei.excelImportPopulator(header, data[index],orgUnit);
                        tei.POST(requestCallback, requestCallback, index,lookUpIndex);
                       
                    }

                })

            });

        }else{

            var tei = new dhis2API.trackedEntityInstance();
            tei.excelImportPopulator(header, data[index]);
            tei.POST(requestCallback, requestCallback, index);
            
            orgUnit = data[index][header[getIndex(FIELD_ORG_UNIT,header)].key];
        }


        function requestCallback(response) {
            if(!orgUnit){
                orgUnit = response.orgUnit;
            }
            if (!lookUpIndex){
                lookUpIndex = response.lookUpIndex;
            }
            notificationCallback(response);

            if (response.status == "OK"){
                var teiUID = response.response.importSummaries[0].reference;
                var tei = [{
                    orgUnit : orgUnit,
                    trackedEntityInstance : teiUID
                }];
                trackedEntityInstances.push(index,tei);

                if (isProgramSpecified(header) ) {

                    if (teiSecondComingMap[DOMAIN_TEI+response.importStat.index]){
                        var lookUpIndex4 = getIndex(FIELD_PROGRAM, header);

                        getEnrollmentByTei(teiUID,header[lookUpIndex4].args,tei[0].orgUnit).then(function(enrollments){
                            if(enrollments.length > 0){
                                var response = {};
                                response.status="OK";
                                response.importStat = {};
                                response.importStat.index=index;
                                response.importStat.domain = DOMAIN_ENROLLMENT;
                                response.lastImported = enrollments[0].enrollment;
                                response.message = "Already enrolled";
                                response.teiSecondComing = teiSecondComingMap[DOMAIN_TEI+response.importStat.index];
                                enrollCallback(response);
                            }
                        })
                    }else{
                        setTimeout(function () {
                            enroll(index, data[index], header, tei, enrollCallback);
                        }, 0);
                    }

                }else{
                    if (trackerSingleSheetCase){
                        importEvents(headers[1],tei);
                    }
                }
            }

            function enrollCallback(response){
                notificationCallback(response);

                if (trackerSingleSheetCase){
                    if (response.teiSecondComing){
                        var lookUpIndex3 = getIndex(FIELD_PROGRAM_STAGE, headers[1]);

                        getEventByTei(tei[0].trackedEntityInstance,headers[1][lookUpIndex3].args).then(function(evData){
                            if (evData.events && evData.events.length>0){debugger
                                updateEvent(headers[1],data,index,evData.events[0].event);
                            }
                        })
                    }else{
                        importEvents(headers[1],tei,index);
                    }
                }
            }

            setTimeout(function () {
                importTEI(response.importStat.index + 1, importData, header,lookUpFlag,lookUpIndex);
            }, 0);
        }
    }

    function updateEvent(header,data,index,eventUid){

        var event = new dhis2API.event();
        event.excelImportPopulator(header, data[index]);
        event.PUT(updateEventCallback, updateEventCallback, index,eventUid);

        function updateEventCallback(response){
            notificationCallback(response);

        }
    }

    function updateTEIs(header) {

        var lookUpIndex = getIndex(FIELD_UID_LOOKUP_BY_ATTR, header);

        if (lookUpIndex!=undefined) {
            updateTEI(0, importData, header, true, lookUpIndex);
        } else {
            alert("No Lookup Provided!")
        }

    }

    function updateTEI(index, data, header, lookUpFlag, lookUpIndex,singleSheetCallback,legacy_lookupindex) {
        var orgUnit;
        if (index == data.length) {
            return
        }

        if (lookUpFlag) {
            getTEIByAttr(ROOT_OU_UID, header[lookUpIndex].args, data[index][header[lookUpIndex].key],legacy_lookupindex).then(function (data_tei) {
                var legacy_lookupindex = data_tei.lookUpIndex;

                if (data_tei.trackedEntityInstances.length !=0) {
                    orgUnit = data_tei.trackedEntityInstances[0].orgUnit;
                    var tei = new dhis2API.trackedEntityInstance(data_tei.trackedEntityInstances[0]);
                    tei.ObjectPopulator(header, data[index]);
                    tei.PUT(requestCallback, requestCallback, index,legacy_lookupindex);
                }else{
                    var response = {};
                    response.importStat = {};
                    response.importStat.index = index;
                    response.importStat.domain = DOMAIN_TEI_UPDATE;
                    response.statusText = "tei not found";
                    requestCallback(response)
                }
            })
        } else {
            // handled by parent funktion
        }

        function requestCallback(response) {

            response.orgUnit = orgUnit;

            if (singleSheetCallback){
                singleSheetCallback(response);
                return;
            }
            setTimeout(function () {
                updateTEI(response.importStat.index + 1, importData, header,lookUpFlag, lookUpIndex);
            }, 0);
        }
    }

    function isProgramSpecified(header) {
        for (var i = 0; i < header.length; i++) {
            if (header[i].domain == DOMAIN_TEI && header[i].field == FIELD_PROGRAM) {
                return true;
            }
        }
        return false;
    }

    function enroll(index, data, header, tei, enrollCallback) {

        var enrollment = new dhis2API.enrollment();

        enrollment.excelImportPopulator(header, data, tei);
        enrollment.POST(enrollCallback, enrollCallback, index);
    }


    function getIndex(field, header) {
        for (var i = 0; i < header.length; i++) {
            if (header[i].field == field) {
                return i;
            }
        }
        return undefined;
    }

    function updateOUs(header) {
        updateOU(0, importData, header);
    }

    function updateOU(index, data, header) {
        if (index == data.length) {
            return
        }

        var ou = new dhis2API.organisationUnit();
        var lookUpName = "";
        for (var i = 0; i < header.length; i++) {
            switch (header[i].field) {
                case FIELD_UID_LOOKUP_BY_NAME :
                    if (header[i].args) {
                        lookUpName = header[i].args;
                    } else {
                        lookUpName = data[index][header[i].key];
                    }
                    break
            }
        }
        ou.excelImportPopulator(header, data[index]);
        getOuByName(lookUpName, ou.level, ou.parent).then(function (orgUnits) {
            if (orgUnits.length != 0) {
                ou.uid = orgUnits[0].id;
                ou.openingDate = orgUnits[0].openingDate;
                ou.shortName = orgUnits[0].shortName;
                ou.update(index, callback)
            } else {
                var response = {};
                response.importStat = {};
                response.importStat.index = index;
                response.importStat.domain = DOMAIN_OU_UPDATE;
                response.status = "ou not found";
                callback(response)
            }
        });

        function callback(response) {
            notificationCallback(response);
            updateOU(response.importStat.index + 1, data, header);
        }
    }

    function deleteOUs(header) {

        deleteOU(0, importData, header);
    }

    function deleteOU(index, data, header) {
        if (index == data.length) {
            return
        }

        var ou = new dhis2API.organisationUnit();

        ou.excelImportPopulator(header, data[index]);//console.log(ou.uid)
        ou.remove(index, callback);

        function callback(response) {
            notificationCallback(response)
            deleteOU(response.importStat.index + 1, data, header);
        }
    }

    function deleteTEIs(header) {
        var lookUpIndex = getIndex(FIELD_UID_LOOKUP_BY_ATTR, header);

        if (lookUpIndex != undefined) {
            deleteTEI(0, importData, header, true, lookUpIndex);
        } else {
            deleteTEI(0, importData, header, false);
        }
    }

    function deleteTEI(index, data, header, lookUpFlag, lookUpIndex) {
        var teiID = undefined;
        var tei = new dhis2API.trackedEntityInstance();

        if (lookUpFlag) {
            getTEIByAttr(ROOT_OU_UID, header[lookUpIndex].args, data[index][header[lookUpIndex].key]).then(function (_tei) {
                if (_tei.length != 0) {
                    teiID = _tei[0].trackedEntityInstance;
                }
                if (teiID) {
                    tei.remove(teiID, index, requestCallback);
                } else {
                    var response = {}
                    response.importStat = {};
                    response.importStat.index = index;
                    response.importStat.domain = DOMAIN_TEI_DELETE;
                    response.conflicts = [{value: "TEI Not Found"}];
                    requestCallback(response);
                    return
                }
            })
        } else {
            for (var i = 0; i < header.length; i++) {
                switch (header[i].field) {
                    case FIELD_UID :
                        if (header[i].args) {
                            teiID = header[i].args;
                        } else {
                            teiID = data[index][header[i].key];
                        }
                        break
                }
            }
            if (teiID) {
                tei.remove(teiID, index, requestCallback);
            } else {
                var response = {}
                response.importStat = {};
                response.importStat.index = index;
                response.importStat.domain = DOMAIN_TEI_DELETE;
                response.conflicts = [{value: "TEI Not Found"}];
                requestCallback(response);
                return
            }
        }

        function requestCallback(response) {
            notificationCallback(response)
            deleteTEI(response.importStat.index + 1, data, header, lookUpFlag, lookUpIndex);
        }
    }

    function enrollTEIs(header) {
        var lookUpIndex = getIndex(FIELD_UID_LOOKUP_BY_ATTR, header);

        if (lookUpIndex) {
            enrollTEI(0, importData, header, true, lookUpIndex)
        }
    }

    function enrollTEI(index, importData, header, lookUpFlag, lookUpIndex) {
        if (index == importData.length) {
            return
        }

        if (lookUpFlag) {
            getTEIByAttr(ROOT_OU_UID, header[lookUpIndex].args, importData[index][header[lookUpIndex].key]).then(function (tei) {

                if (tei.length == 0) {
                    var response = {}
                    response.importStat = {};
                    response.importStat.index = index;
                    response.importStat.domain = DOMAIN_ENROLLMENT;
                    response.conflicts = [{value: "TEI Not Found"}];
                    requestCallback(response);
                    return
                }
                var enrollment = new dhis2API.enrollment();
                enrollment.excelImportPopulator(header, importData[index], tei[0].trackedEntityInstance);
                enrollment.POST(requestCallback, requestCallback, index);
            })
        }


        function requestCallback(response) {
            notificationCallback(response);

            setTimeout(function () {
                enrollTEI(response.importStat.index + 1, importData, header, lookUpFlag, lookUpIndex);
            }, 0);
        }
    }

    function getTEIByAttr(rootOU, attr, value,lookUpIndex,ou) {
        var def = $.Deferred();
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            url: '../../trackedEntityInstances?ou=' + rootOU + '&ouMode=DESCENDANTS&filter=' + attr + ':eq:' + value,
            success: function (data) {
                if (lookUpIndex){
                    data.lookUpIndex = lookUpIndex;
                    data.orgUnit=ou;
                    def.resolve(data);
                    return
                }
                def.resolve(data.trackedEntityInstances);
            }
        });
        return def;
    }

    function importDVS(header) {

        var lookUpIndex = getIndex(FIELD_UID_LOOKUP_BY_OU_CODE, header);

        importDV(0, importData, header,lookUpIndex);

    }

    function importDV(index, data, header, lookUpIndex) {
        if (index == data.length) {
            return
        }

        if (lookUpIndex != undefined){

            var code = data[index][header[lookUpIndex].key];
            getOuByCode(code).then(function(orgUnits){

                var ouUid;
                if (orgUnits.length >0){
                    ouUid = orgUnits[0].id;
                }

                var dv = new dhis2API.dataValue();

                dv.excelImportPopulator(header, data[index],ouUid);
                dv.POST(requestCallback, requestCallback, index);
            });

        }else{
            var dv = new dhis2API.dataValue();

            dv.excelImportPopulator(header, data[index]);
            dv.POST(requestCallback, requestCallback, index);
        }

        function requestCallback(response) {
            notificationCallback(response);

            setTimeout(function () {
                importDV(response.importStat.index + 1, importData, header,lookUpIndex);
            }, 0);
        }
    }

    function importUsers(header){
        importUser(0, importData, header);
    }

    function importUser(index, data, header){
        if (index == data.length) {
            return
        }

        var user = new dhis2API.user();
        user.excelImportPopulator(header, data[index]);
        user.POST(requestCallback, requestCallback, index);

        function requestCallback(response) {
            notificationCallback(response);

            setTimeout(function () {
                importUser(response.importStat.index + 1, importData, header);
            }, 0);
        }
    }

    function getOuByName(name, level, parentUID) {
        var def = $.Deferred();
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            url: '../../organisationUnits?level=' + level + '&fields=id,name,parent,shortName,openingDate&filter=parent.id:eq:' + parentUID + '&filter=name:eq:' + name,
            success: function (data) {
                def.resolve(data.organisationUnits);
            }
        });
        return def;
    }

    function getOuByCode(code,lookUpIndex) {
        var def = $.Deferred();
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            url: '../../organisationUnits?fields=id,name&filter=code:eq:' + code,
            success: function (data) {
                if (lookUpIndex){
                    data.lookUpIndex=lookUpIndex;
                    def.resolve(data);
                    return;
                }
                def.resolve(data.organisationUnits);
            }
        });
        return def;
    }

    function getEventByTei(teiUid,psUid) {
        var def = $.Deferred();
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            url: '../../events?programStage='+psUid+'&trackedEntityInstance='+teiUid+'&order:lastUpdated:asc&pageSize=1&fields=event',
            success: function (data) {
                def.resolve(data);
            }
        });
        return def;
    }

    function getEnrollmentByTei(teiUid,prgUid,ouUid) {
        var def = $.Deferred();
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            url: '../../enrollments?ou='+ouUid+'&program='+prgUid+'&trackedEntityInstance='+teiUid,
            success: function (data) {
                def.resolve(data.enrollments);
            }
        });
        return def;
    }

    function isTrackerSingleSheetCase(){
        if (headers.length ==2){
            if (headers[0][0].domain == DOMAIN_TEI && headers[1][0].domain == DOMAIN_EVENT  ){
                return true;
            }
        }
        return false;
    }

    function handleMultiDomainCase(){

        trackerSingleSheetCase = true;
        importTEIs(headers[0]);

    }
}