/**
 * Created by harsh on 9/5/16.
 */

function importHandler(headers,importData,notificationCallback){

    for (var key in headers){
        var domain = headers[key][0].domain;
        switch(domain){
            case DOMAIN_TEI : importTEIs(headers[key]);
                break
            case DOMAIN_EVENT : importEvents(headers[key]);
                break
            case DOMAIN_EVENT_DELETE : deleteEvents(headers[key]);
                break
            case DOMAIN_ENROLLMENT : enrollTEIs(headers[key])
                break
        }
    }

    function deleteEvents(header){
        deleteEvent(0,importData,header);
    }

    function deleteEvent(index,data,header){
        var event = new dhis2API.event();
        var eventID = undefined;
        for (var i=0;i<header.length;i++){
            switch(header[i].field){
                case FIELD_UID :
                    if (header[i].args){
                        eventID = header[i].args;
                    }else{
                        eventID= data[index][header[i].key];
                    }
                    break
            }
        }

      //  if (eventID)
        event.remove(eventID,index,callback);

        function callback(response){
            notificationCallback(response)
            deleteEvent(response.importStat.index+1,data,header);
        }
    }

    function importEvents(header){
        var lookUpIndex =  getIndex(FIELD_UID_LOOKUP_BY_ATTR,header);

        if (lookUpIndex){
            importEvent(0,importData,header,true,lookUpIndex);
        }

        //importEvent(0,importData,header);
    }
    function importEvent(index,data,header,lookUpFlag,lookUpIndex){
        if (index == data.length){return}

        if (lookUpFlag){
            getTEIByAttr(ROOT_OU,header[lookUpIndex].args,data[index][header[lookUpIndex].key]).then(function(tei){

                var event = new dhis2API.event();
                event.excelImportPopulator(header,data[index],tei);
                event.POST(eventCallback,eventCallback,index);
            })
        }

        function eventCallback(response){
            notificationCallback(response);

            setTimeout(function(){
                importEvent(response.importStat.index+1,importData,header,lookUpFlag,lookUpIndex);
            },0);
        }
    }

    function importTEIs(header){

        importTEI(0,importData,header);
    }

    function importTEI(index,data,header){
        if (index == data.length){return}

        var tei = new dhis2API.trackedEntityInstance();
        tei.excelImportPopulator(header,data[index]);
        tei.POST(requestCallback,requestCallback,index);

        function requestCallback(response){
            notificationCallback(response);

            if (isProgramSpecified(header) && response.status == "OK"){
                setTimeout(function(){
                    enroll(index,data[index],header,response.response.reference);
                },0);
            }
            setTimeout(function(){
                importTEI(response.importStat.index+1,importData,header);
            },0);
        }
    }

    function isProgramSpecified(header){
        for (var i=0;i<header.length;i++){
            if (header[i].domain == DOMAIN_TEI && header[i].field == FIELD_PROGRAM){
                return true;
            }
        }
        return false;
    }

    function enroll(index,data,header,tei){

        var enrollment = new dhis2API.enrollment();

        enrollment.excelImportPopulator(header,data,tei);
        enrollment.POST(notificationCallback,notificationCallback,index);

    }

    function getIndex(field,header){
        for (var i=0;i<header.length;i++){
            if (header[i].field == field){
                return i;
            }
        }
        return undefined;
    }

    function enrollTEIs(header){
        var lookUpIndex =  getIndex(FIELD_UID_LOOKUP_BY_ATTR,header);

        if (lookUpIndex) {
            enrollTEI(0, importData, header,true,lookUpIndex)
        }
    }

    function enrollTEI(index,importData,header,lookUpFlag,lookUpIndex){
        if (index == importData.length){return}

        if (lookUpFlag){
            getTEIByAttr(ROOT_OU,header[lookUpIndex].args,importData[index][header[lookUpIndex].key]).then(function(tei){

                if (tei.length==0){
                    var response = {}
                    response.importStat = {};
                    response.importStat.index=index;
                    response.importStat.domain = DOMAIN_ENROLLMENT;
                    response.conflicts = [{value : "TEI Not Found"}];
                    requestCallback(response);
                    return
                }
                var enrollment = new dhis2API.enrollment();
                enrollment.excelImportPopulator(header,importData[index],tei[0].trackedEntityInstance);
                enrollment.POST(requestCallback,requestCallback,index);
            })
        }


        function requestCallback(response){
            notificationCallback(response);

            setTimeout(function(){
                enrollTEI(response.importStat.index+1,importData,header,lookUpFlag,lookUpIndex);
            },0);
        }
    }
    function getTEIByAttr(rootOU,attr,value){
        var def = $.Deferred();
        $.ajax({
            type: "GET",
            dataType: "json",
            contentType: "application/json",
            url: '../../trackedEntityInstances?ou='+rootOU+'&ouMode=DESCENDANTS&filter='+attr+':eq:'+value,
            success: function (data) {
                def.resolve(data.trackedEntityInstances);
            }
        });
        return def;
    }
}