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
        }
    }

    function importEvents(header){
        importEvent(0,importData,header);
    }
    function importEvent(index,data,header){
        if (index == data.length){return}

        var event = new dhis2API.event();
        event.excelImportPopulator(header,data[index]);
        event.POST(eventCallback,eventCallback,index);

        function eventCallback(response){
            notificationCallback(response);

            setTimeout(function(){
                importEvent(response.importStat.index+1,importData,header);
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

}