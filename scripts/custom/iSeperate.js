function register(headers,importData){
   
    var trackedEntityInstances = [];
    var programStages = ["LOQYeWniuCM","I9QcUPzUzJZ"];

    for (var key in headers) {
        
        var domain = headers[key][0].domain;
        switch (domain) {
            case DOMAIN_TEI :
                createTei(headers[key]);
                break
            /*case DOMAIN_EVENT :
                importEvents(headers[key]);
                break
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
                break*/
        }
    }

    function createTei(header){
        
        var index = 0;
        var tei = new dhis2API.trackedEntityInstance();
        tei.excelImportPopulator(header, data[index]);
        tei.POST(teiSuccessCallback,teiSuccessCallback,0,0);
    }

    function teiSuccessCallback(response){
        Console.log(response)
    }
}