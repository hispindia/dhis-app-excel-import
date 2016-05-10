/**
 * Created by harsh on 9/5/16.
 */

function importHandler(headers,importData,notificationCallback){

    for (var key in headers){
        var domain = headers[key][0].domain;
        switch(domain){
            case DOMAIN_TEI : importTEIs(headers[key]);
                break
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
        }


    }
}