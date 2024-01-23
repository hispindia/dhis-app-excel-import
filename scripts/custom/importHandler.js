/**
 * Created by harsh on 9/5/16.
 */

function importHandler(orgUnitUID,headers,importData,notificationCallback) {
    var trackerSingleSheetCase = false;
    var teiSecondComingMap = [];

    // take orgUnit from tree not from mapping sheet
    var selectedOrgUnitID = orgUnitUID;
    if(isTrackerSingleSheetCase()){
        handleMultiDomainCase( selectedOrgUnitID );
        return;
    }

    for (var key in headers) {

        var domain = headers[key][0].domain;
        switch (domain) {
            case DOMAIN_TEI :
                importTEIs(headers[key],selectedOrgUnitID);
                break
            case DOMAIN_EVENT :
                importEvents(headers[key],selectedOrgUnitID);
                break
            case DOMAIN_ENROLLMENT :
                enrollTEIs(headers[key],selectedOrgUnitID);
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
            importEvent(index, importData, header, false,null,tei,selectedOrgUnitID);
            return
        }
        var lookUpIndex = getIndex(FIELD_UID_LOOKUP_BY_ATTR, header);

        if (lookUpIndex) {
            importEvent(0, importData, header, true, lookUpIndex,selectedOrgUnitID);
        } else {
            importEvent(0, importData, header, false,selectedOrgUnitID);
        }

    }

    function importEvent(index, data, header, lookUpFlag, lookUpIndex,tei,selectedOrgUnitID) {
        if (index == data.length) {
            return
        }

        if (lookUpFlag) {
            getTEIByAttr( header[getIndex(FIELD_PROGRAM, header)].args, ROOT_OU_UID, header[lookUpIndex].args, data[index][header[lookUpIndex].key]).then(function (tei) {

                var event = new dhis2API.event();
                event.excelImportPopulator(header, data[index], tei,selectedOrgUnitID);
                event.POST(eventCallback, eventCallback, index);
            })
        } else if (tei){
            var event = new dhis2API.event();
            event.excelImportPopulator(header, data[index], tei,selectedOrgUnitID);
            event.POST(eventCallback, eventCallback, index);
        }else {
            var event = new dhis2API.event();
            event.excelImportPopulator(header, data[index],selectedOrgUnitID);
            event.POST(eventCallback, eventCallback, index);
        }

        function eventCallback(response) {
            notificationCallback(response);

            if (trackerSingleSheetCase) return;

            setTimeout(function () {
                importEvent(response.importStat.index + 1, importData, header, lookUpFlag, lookUpIndex,selectedOrgUnitID);
            }, 1000);
        }
    }

    async function importTEIs(header,selectedOrgUnitID) {

        //var lookUpIndex = getIndex(FIELD_UID_LOOKUP_BY_CODE, header);
        var lookUpIndex = true;
        if (lookUpIndex){
            await importTEI(0, importData, header,true,lookUpIndex,selectedOrgUnitID);
        }else{
            await importTEI(0, importData, header,false,selectedOrgUnitID);
        }
    }

    async function importTEI(index, data, header, lookUpFlag, lookUpIndex,selectedOrgUnitID) {
        var orgUnit = selectedOrgUnitID;

        teiSecondComingMap[DOMAIN_TEI+index] = false;
        if (index === data.length) {
            return
        }

        if (lookUpFlag){

            //var code = data[index][header[lookUpIndex].key];
           //getOuByCode(code,lookUpIndex).then(function(orgUnits){

               // This has made refactoring absolutely necessary :(
            /*
                var lookUpIndex = orgUnits.lookUpIndex;
                var ouUid;
                if (orgUnits.organisationUnits.length >0){
                    ouUid = orgUnits.organisationUnits[0].id;
                }
                orgUnit = ouUid;

             */
               //orgUnit = data[index][header[getIndex(FIELD_ORG_UNIT,header)].key];
                var lookUpIndex2 = getIndex(FIELD_UID_LOOKUP_BY_ATTR, header);

                var resTEIAttr = await getTEIByAttr(header[getIndex(FIELD_PROGRAM, header)].args,ROOT_OU_UID, header[lookUpIndex2].args, data[index][header[lookUpIndex2].key],lookUpIndex,orgUnit)
                    if (resTEIAttr ){
                        let data_tei = resTEIAttr
                        let orgUnit = data_tei.orgUnit;
                        let lookUpIndex = data_tei.lookUpIndex;

                        if (data_tei.trackedEntityInstances.length > 0){
                            teiSecondComingMap[DOMAIN_TEI+index] = true;
                            updateTEI(index, importData, header, true, lookUpIndex2,requestCallback,lookUpIndex);

                        }else{
                            let tei = new dhis2API.trackedEntityInstance();
                            tei.excelImportPopulator(header, data[index],orgUnit);
                            tei.POST(requestCallback, requestCallback, index,lookUpIndex);

                        }
                    }
            //});

        }else{

            var tei = new dhis2API.trackedEntityInstance();
            tei.excelImportPopulator(header, data[index], orgUnit);
            tei.POST(requestCallback, requestCallback, index);

            //orgUnit = data[index][header[getIndex(FIELD_ORG_UNIT,header)].key];
            orgUnit =  selectedOrgUnitID;
        }


        function requestCallback(response) {
            if(!orgUnit){
                orgUnit = response.orgUnit;
            }
            if (!lookUpIndex){
                lookUpIndex = response.lookUpIndex;
            }
            notificationCallback(response);

            if (response.status === "OK"){
                //var teiUID = response.response.reference;
                var teiUID = "";
                if( response.response.importOptions.skipLastUpdated){
                    teiUID = response.response.importSummaries[0].reference;
                }
                else{
                    teiUID = response.response.reference;
                }

                //var teiUID = response.response.importSummaries[0].reference;
                //var teiUID = response.response.reference;
                var tei = [{
                    orgUnit : orgUnit,
                    trackedEntityInstance : teiUID
                }];


                if (isProgramSpecified(header) ) {

                    if (teiSecondComingMap[DOMAIN_TEI+response.importStat.index]){
                        var lookUpIndex4 = getIndex(FIELD_PROGRAM, header);

                        getEnrollmentByTei(teiUID,header[lookUpIndex4].args,tei[0].orgUnit).then(function(enrollments){
                            if(enrollments.length > 0){
                                var response = {};
                                response.status="OK";
                                response.enrollmentDate = enrollments[0].enrollmentDate.split("T")[0];
                                response.importStat = {};
                                response.importStat.index=index;
                                response.importStat.domain = DOMAIN_ENROLLMENT;
                                response.lastImported = enrollments[0].enrollment;
                                response.message = "Already enrolled";
                                response.teiSecondComing = teiSecondComingMap[DOMAIN_TEI+response.importStat.index];
                                enrollCallback(response);
                            }else{
                                setTimeout(function () {
                                    enroll(index, data[index], header, tei, enrollCallback);
                                }, 1000);
                            }
                        })
                    }else{
                        setTimeout(function () {
                            enroll(index, data[index], header, tei, enrollCallback);
                        }, 1000);
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
                    /*
                    if (response.teiSecondComing){
                        var lookUpIndex3 = getIndex(FIELD_PROGRAM_STAGE, headers[1]);
// required comment for not update event and create new event
                        getEventByTei(tei[0].trackedEntityInstance,headers[1][lookUpIndex3].args).then(function(evData){
                            if (evData.events && evData.events.length>0){
                                updateEvent(headers[1],data,index,evData.events[0].event);
                            }else{
                                importEvents(headers[1],tei,index);
                            }
                        })
                    }else{
                        importEvents(headers[1],tei,index);
                    }
                    */
                    //var tempEventDate = response.enrollmentDate;



                    importEvents(headers[1],tei,index);
                }
            }

            setTimeout(async function () {
                await importTEI(response.importStat.index + 1, importData, header,lookUpFlag,lookUpIndex,selectedOrgUnitID);
            }, 1000);
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
            getTEIByAttr(header[getIndex(FIELD_PROGRAM, header)].args,ROOT_OU_UID, header[lookUpIndex].args, data[index][header[lookUpIndex].key],legacy_lookupindex).then(function (data_tei) {
                var legacy_lookupindex = data_tei.lookUpIndex;

                if (data_tei.trackedEntityInstances.length !==0) {
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
            }, 1000);
        }
    }

    function isProgramSpecified(header) {
        for (var i = 0; i < header.length; i++) {
            if (header[i].domain === DOMAIN_TEI && header[i].field === FIELD_PROGRAM) {
                return true;
            }
        }
        return false;
    }

    function enroll(index, data, header, tei, enrollCallback) {

        var enrollment = new dhis2API.enrollment();

        // add feature to take enrollmentDate from eventDate mapped in template #ev@eventDate
        // importData as all data
        var tempEnrollmentRegHeaders = headers[0];
        var tempEventHeaders = headers[1];
        var lookUpIndexEnrollmentDate = getIndex(FIELD_EVENT_DATE, tempEventHeaders);
        //console.log( "lookUpIndexEnrollmentDate  " + lookUpIndexEnrollmentDate);
        var tempEnrollmentDate = importData[index][tempEventHeaders[lookUpIndexEnrollmentDate].key];
        //console.log( "tempEnrollmentDate 1 " + tempEnrollmentDate);

        enrollment.excelImportPopulator(header, data, tei, tempEnrollmentDate);
        enrollment.POST(enrollCallback, enrollCallback, index);
    }


    function getIndex(field, header) {
        for (var i = 0; i < header.length; i++) {
            if (header[i].field === field) {
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
            getTEIByAttr(header[getIndex(FIELD_PROGRAM, header)].args, ROOT_OU_UID, header[lookUpIndex].args, data[index][header[lookUpIndex].key]).then(function (_tei) {
                if (_tei.length !== 0) {
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

    function enrollTEIs(header,selectedOrgUnitID) {
        var lookUpIndex = getIndex(FIELD_UID_LOOKUP_BY_ATTR, header);

        if (lookUpIndex) {
            enrollTEI(0, importData, header, true, lookUpIndex,selectedOrgUnitID)
        }
    }

    function enrollTEI(index, importData, header, lookUpFlag, lookUpIndex,selectedOrgUnitID) {
        if (index == importData.length) {
            return
        }

        if (lookUpFlag) {
            getTEIByAttr(header[getIndex(FIELD_PROGRAM, header)].args, ROOT_OU_UID, header[lookUpIndex].args, importData[index][header[lookUpIndex].key]).then(function (tei) {

                if (tei.length === 0) {
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
                enrollTEI(response.importStat.index + 1, importData, header, lookUpFlag, lookUpIndex,selectedOrgUnitID);
            }, 1000);
        }
    }

    function getTEIByAttr(prgUID, rootOU, attr, value,lookUpIndex,ou) {
        var def = $.Deferred();
        $.ajax({
            async: false,
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            url: '../../trackedEntityInstances?ou=' + rootOU + '&program=' + prgUID + '&ouMode=DESCENDANTS&filter=' + attr + ':eq:' + value,
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
        return def.promise();
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
            url: '../../enrollments?programStatus=ACTIVE&ou='+ouUid+'&program='+prgUid+'&trackedEntityInstance='+teiUid,
            success: function (data) {
                if (!data.enrollments){
                    data.enrollments = [];
                }
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

    function handleMultiDomainCase( selectedOrgUnitID ){

        trackerSingleSheetCase = true;
        importTEIs(headers[0], selectedOrgUnitID);


    }
}