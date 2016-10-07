/**
 * Created by harsh on 9/5/16.
 */

function importHandler(headers,importData,notificationCallback) {
    var trackerSingleSheetCase = false;

    if(isTrackerSingleSheetCase()){
        handleMultiDomainCase();
        return;
    }

    for (var key in headers) {

        var domain = headers[key][0].domain;
        switch (domain) {
            case DOMAIN_TRACKER :

                break
            case DOMAIN_TEI :
                importTEIs(headers[key]);
                break
            case DOMAIN_EVENT :
                importEvents(headers[key]);
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

    function importEvents(header,tei) {
        if (tei!=undefined){
            importEvent(0, importData, header, false,null,tei);
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
            event.excelImportPopulator(header, data[index]);
            event.POST(eventCallback, eventCallback, index);
        }

        function eventCallback(response) {
            notificationCallback(response);
            setTimeout(function () {
                importEvent(response.importStat.index + 1, importData, header, lookUpFlag, lookUpIndex);
            }, 0);
        }
    }

    function importTEIs(header) {
        importTEI(0, importData, header);
    }

    function importTEI(index, data, header) {
        if (index == data.length) {
            return
        }

        var tei = new dhis2API.trackedEntityInstance();
        tei.excelImportPopulator(header, data[index]);
        tei.POST(requestCallback, requestCallback, index);

        var orgUnit = data[index][header[getIndex(FIELD_ORG_UNIT,header)].key];debugger
        function requestCallback(response) {
            notificationCallback(response);

            if (response.status == "OK"){
                var teiUID = response.response.reference;
                var tei = [{
                    orgUnit : orgUnit,
                    trackedEntityInstance : teiUID
                }];
                if (isProgramSpecified(header) ) {
                    setTimeout(function () {
                        enroll(index, data[index], header, teiUID, enrollCallback);
                    }, 0);
                }else{
                    if (trackerSingleSheetCase){

                        importEvents(headers[1],tei);
                    }
                }
            }

            function enrollCallback(response){
                notificationCallback(response);

                if (trackerSingleSheetCase){
                    importEvents(headers[1],tei);
                }
            }

            setTimeout(function () {
                importTEI(response.importStat.index + 1, importData, header);
            }, 0);
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

    function updateTEI(index, data, header, lookUpFlag, lookUpIndex) {
        if (index == data.length) {
            return
        }

        if (lookUpFlag) {
            getTEIByAttr(ROOT_OU_UID, header[lookUpIndex].args, data[index][header[lookUpIndex].key]).then(function (data_tei) {
                if (data_tei.length !=0) {
                    var tei = new dhis2API.trackedEntityInstance(data_tei[0]);
                    tei.ObjectPopulator(header, data[index]);
                    tei.PUT(requestCallback, requestCallback, index);
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
            notificationCallback(response);

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

    function getTEIByAttr(rootOU, attr, value) {
        var def = $.Deferred();
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            url: '../../trackedEntityInstances?ou=' + rootOU + '&ouMode=DESCENDANTS&filter=' + attr + ':eq:' + value,
            success: function (data) {
                def.resolve(data.trackedEntityInstances);
            }
        });
        return def;
    }

    function importDVS(header) {
        importDV(0, importData, header);

    }

    function importDV(index, data, header) {
        if (index == data.length) {
            return
        }

        var dv = new dhis2API.dataValue();

        dv.excelImportPopulator(header, data[index]);
        dv.POST(requestCallback, requestCallback, index);

        function requestCallback(response) {
            notificationCallback(response);

            setTimeout(function () {
                importDV(response.importStat.index + 1, importData, header);
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