/**
 * Created by harsh on 9/5/16.
 */

var dhis2API = dhis2API || {};

dhis2API.
    trackedEntityInstance = function(){

        this.orgUnit = "";
        this.trackedEntity = "";
        this.attributes = [];

//
//this.prototype.DELETE = function(URL){
//}
//
//this.prototype.PUT = function(URL){
//}

}
dhis2API.trackedEntityInstance.prototype.getAPIObject = function(){
    var tei = {
        orgUnit : this.orgUnit,
        trackedEntity : this.trackedEntity,
        attributes : this.attributes
    }
    return tei;
}

dhis2API.trackedEntityInstance.prototype.excelImportPopulator = function(header,data){

    for (var i=0;i<header.length;i++){
        switch(header[i].field){
            case FIELD_ORG_UNIT :
                if (header[i].args){
                    this.orgUnit = header[i].args;
                }else{
                    this.orgUnit = data[header[i].key];
                }
                break
            case FIELD_TRACKED_ENTITY:
                if (header[i].args){
                    this.trackedEntity = header[i].args;
                }else{
                    this.trackedEntity = data[header[i].key];
                }
                break
            case FIELD_ATTRIBUTE:
                this.attributes.push({
                    attribute: header[i].args,
                    value:  data[header[i].key]
                })
                break

        }
    }
}

dhis2API.trackedEntityInstance.prototype.POST = function(successCallback,errorCallback,index){
    var tei = this.getAPIObject()
    var def = $.Deferred();

    $.ajax({
        type: "POST",
        dataType: "json",
        async : false,
        contentType: "application/json",
        url: '../../trackedEntityInstances',
        data: JSON.stringify(tei),
        success: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = JSON.stringify(tei);
            response.importStat.domain = DOMAIN_TEI;

            successCallback(response);
        },
        error: function(response){debugger
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = JSON.stringify(tei);
            response.importStat.domain = DOMAIN_TEI;

            errorCallback(response);
        }
    });

    return def;
}