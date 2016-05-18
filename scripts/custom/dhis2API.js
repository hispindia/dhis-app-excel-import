/**
 * Created by harsh on 9/5/16.
 */

var dhis2API = dhis2API || {};

dhis2API.
    trackedEntityInstance = function(){

        this.orgUnit = "";
        this.trackedEntity = "";
        this.attributes = [];
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
        error: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = (tei);
            response.importStat.domain = DOMAIN_TEI;

            errorCallback(response);
        }
    });

    return def;
}

/*Enrollment*/
dhis2API.enrollment = function(){
    this.orgUnit = "";
    this.tei = "";
    this.enrollmentDate = "";
    this.program = "";
}

dhis2API.enrollment.prototype.excelImportPopulator = function(header,data,tei){

    this.tei = tei;
    for (var i=0;i<header.length;i++){
        switch(header[i].field){
            case FIELD_ORG_UNIT :
                if (header[i].args){
                    this.orgUnit = header[i].args;
                }else{
                    this.orgUnit = data[header[i].key];
                }
                break
            case FIELD_PROGRAM:
                if (header[i].args){
                    this.program = header[i].args;
                }else{
                    this.program = data[header[i].key];
                }
                break
            case FIELD_ENROLLMENT_DATE :
                if (header[i].args){
                    this.enrollmentDate = header[i].args;
                }else{
                    this.enrollmentDate = data[header[i].key];
                }
                break
        }
    }
}

dhis2API.enrollment.prototype.POST = function(successCallback,errorCallback,index){
    var enrollment = this.getAPIObject()
    var def = $.Deferred();

    $.ajax({
        type: "POST",
        dataType: "json",
        async : false,
        contentType: "application/json",
        url: '../../enrollments',
        data: JSON.stringify(enrollment),
        success: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = JSON.stringify(enrollment);
            response.importStat.domain = DOMAIN_ENROLLMENT;

            successCallback(response);
        },
        error: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = (enrollment);
            response.importStat.domain = DOMAIN_ENROLLMENT;

            errorCallback(response);
        }
    });

    return def;
}
dhis2API.enrollment.prototype.getAPIObject = function(){
    var ent = {
        orgUnit : this.orgUnit,
        trackedEntityInstance : this.tei,
        program : this.program,
        enrollmentDate : this.enrollmentDate
    }
    return ent;
}

/*Event*/
dhis2API.event = function(){
    this.orgUnit = "";
    this.tei = "";
    this.enrollmentDate = "";
    this.program = "";
    this.dataValues = []
}

dhis2API.event.prototype.excelImportPopulator = function(header,data){

    for (var i=0;i<header.length;i++){
        switch(header[i].field){
            case FIELD_ORG_UNIT :
                if (header[i].args){
                    this.orgUnit = header[i].args;
                }else{
                    this.orgUnit = data[header[i].key];
                }
                break
            case FIELD_PROGRAM:
                if (header[i].args){
                    this.program = header[i].args;
                }else{
                    this.program = data[header[i].key];
                }
                break
            case FIELD_PROGRAM_STAGE:
                if (header[i].args){
                    this.programStage = header[i].args;
                }else{
                    this.programStage = data[header[i].key];
                }
                break
            case FIELD_EVENT_DATE :
                if (header[i].args){
                    this.eventDate = header[i].args;
                }else{
                    this.eventDate = data[header[i].key];
                }
                break
            case FIELD_TRACKED_ENTITY_INSTANCE:
                if (header[i].args){
                    this.tei = header[i].args;
                }else{
                    this.tei = data[header[i].key];
                }
                break
            case FIELD_DATAELEMENT:
                this.dataValues.push({
                    dataElement: header[i].args,
                    value:  data[header[i].key]
                })
                break
        }
    }
}

dhis2API.event.prototype.POST = function(successCallback,errorCallback,index){
    var event = this.getAPIObject()
    var def = $.Deferred();

    $.ajax({
        type: "POST",
        dataType: "json",
        async : false,
        contentType: "application/json",
        url: '../../events',
        data: JSON.stringify(event),
        success: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = event;
            response.importStat.domain = DOMAIN_EVENT;

            successCallback(response);
        },
        error: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = (event);
            response.importStat.domain = DOMAIN_EVENT;

            errorCallback(response);
        }
    });

    return def;
}
dhis2API.event.prototype.getAPIObject = function(){
    var ent = {
        orgUnit : this.orgUnit,
        trackedEntityInstance : this.tei,
        eventDate : this.eventDate,
        programStage : this.programStage,
        program : this.program,
        dataValues : this.dataValues
    }
    return ent;
}

function addImportStatToResponse(index,metadata,domain,outcome){
   var importStat = {};
    importStat.index=index;
    importStat.metadata = metadata;
    importStat.domain = domain;
    importStat.outcome = outcome;

}