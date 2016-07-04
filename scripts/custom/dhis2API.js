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

dhis2API.trackedEntityInstance.prototype.remove = function(id,index,callback){

    $.ajax({
        type: "DELETE",
        url: '../../trackedEntityInstances/'+id,
        success: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.domain = DOMAIN_TEI_DELETE;
            callback(response);
        },
        error: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.domain = DOMAIN_TEI_DELETE;
            callback(response);
        }
    });

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
                break;
            case FIELD_ENROLLMENT_DATE :
                if (header[i].args){
                    this.enrollmentDate = header[i].args;
                }else{
                    this.enrollmentDate = data[header[i].key];
                }
                break
 //           case FIELD_UID_LOOKUP_BY_ATTR :

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
    this.dataValues = [];
    this.status = undefined
}

dhis2API.event.prototype.excelImportPopulator = function(header,data,tei){

    if (tei){
        if (tei.length >0){
            this.tei = tei[0].trackedEntityInstance;
        }
    }


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
                break;
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
            case FIELD_COMPLETE:
                this.status = "COMPLETED";
                break;

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
dhis2API.event.prototype.remove = function(id,index,callback){

    $.ajax({
        type: "DELETE",
        url: '../../events/'+id,
        success: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.domain = DOMAIN_EVENT_DELETE;
          callback(response);
        },
        error: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.domain = DOMAIN_EVENT_DELETE;
            callback(response);
        }
    });

}
dhis2API.event.prototype.getAPIObject = function(){
    var ent = {
        orgUnit : this.orgUnit,
        trackedEntityInstance : this.tei,
        eventDate : this.eventDate,
        programStage : this.programStage,
        program : this.program,
        dataValues : this.dataValues,
        status : this.status
    }
    return ent;
}

dhis2API.organisationUnit = function(){
    this.uid=undefined;
    this.name = undefined;
    this.parent = undefined;
    this.code = undefined;
    this.shortName = undefined;
    this.openingDate = undefined;
    this.level=undefined;

}

dhis2API.organisationUnit.prototype.excelImportPopulator = function(header,data){

    for (var i=0;i<header.length;i++){
        switch(header[i].field){
            case FIELD_UID :
                if (header[i].args){
                    this.uid = header[i].args;
                }else{
                    this.uid = data[header[i].key];
                }
                break
            case FIELD_NAME :
                if (header[i].args){
                    this.name = header[i].args;
                }else{
                    this.name = data[header[i].key];
                }
                break
            case FIELD_CODE :
                if (header[i].args){
                    this.code = header[i].args;
                }else{
                    this.code = data[header[i].key];
                }
                break
            case FIELD_LEVEL:
                if (header[i].args){
                    this.level = header[i].args;
                }else{
                    this.level = data[header[i].key];
                }
                break
            case FIELD_PARENT:
                if (header[i].args){
                    this.parent = header[i].args;
                }else{
                    this.parent = data[header[i].key];
                }
                break
        }
    }
}

dhis2API.organisationUnit.prototype.getAPIObject = function(){
    var ou = {
        uid:this.uid,
        name:this.name,
        code:this.code,
        level:this.level,
        openingDate:this.openingDate,
        shortName:this.shortName
    }
    return ou;
}
dhis2API.organisationUnit.prototype.update = function(index,callback) {

    var ou = this.getAPIObject();
    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        url: '../../organisationUnits/'+ou.uid+'',
        data: JSON.stringify(ou),
        success: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = ou;
            response.importStat.domain = DOMAIN_OU_UPDATE;

            callback(response);
        },
        error: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = (ou);
            response.importStat.domain = DOMAIN_OU_UPDATE;

            callback(response);
        }
    });

}
dhis2API.organisationUnit.prototype.remove = function(index,callback){

    $.ajax({
        type: "DELETE",
        url: '../../organisationUnits/'+this.uid,
        success: function(response){
            response = {}
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.domain = DOMAIN_OU_DELETE;
            callback(response);
        },
        error: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.domain = DOMAIN_OU_DELETE;
            callback(response);
        }
    });

}


dhis2API.dataValue = function(){

    this.dataElement = undefined;
        this.period = undefined;
        this.orgUnit= undefined;
        this.categoryOptionCombo= undefined;
        this.value= undefined
        this.storedBy= undefined;
}

dhis2API.dataValue.prototype.getAPIObject = function(){
    var dvs = {dataValues:[]}

    var dv = {
        dataElement:this.dataElement,
        period:this.period,
        orgUnit:this.orgUnit,
        categoryOptionCombo:this.categoryOptionCombo,
        value:this.value,
        storedBy:this.storedBy
    }

    dvs.dataValues.push(dv);
    return dvs;
}

dhis2API.dataValue.prototype.excelImportPopulator = function(header,data){

    for (var i=0;i<header.length;i++){
        switch(header[i].field){
            case FIELD_ORG_UNIT :
                if (header[i].args){
                    this.orgUnit = header[i].args;
                }else{
                    this.orgUnit = data[header[i].key];
                }
                break
            case FIELD_DATAELEMENT:
                if (header[i].args){
                    this.dataElement = header[i].args;
                }else{
                    this.dataElement = data[header[i].key];
                }
                break
            case FIELD_PERIOD:
                if (header[i].args){
                    this.period = header[i].args;
                }else{
                    this.period = data[header[i].key];
                }
                break
            case FIELD_STORED_BY:
                if (header[i].args){
                    this.storedBy = header[i].args;
                }else{
                    this.storedBy = data[header[i].key];
                }
                break
            case FIELD_DVS_VALUE:
                if (header[i].args){
                    this.value = header[i].args;
                }else{
                    this.value = data[header[i].key];
                }
                break
            case FIELD_CATEGORY_OPTION_COMBINATION:
                if (header[i].args){
                    this.categoryOptionCombo = header[i].args;
                }else{
                    this.categoryOptionCombo = data[header[i].key];
                }
                break
        }
    }
}

dhis2API.dataValue.prototype.POST = function(successCallback,errorCallback,index){
    var dvs = this.getAPIObject()
    var def = $.Deferred();

    $.ajax({
        type: "POST",
        dataType: "json",
        async : false,
        contentType: "application/json",
        url: '../../dataValueSets',
        data: JSON.stringify(dvs),
        success: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = dvs;
            response.importStat.domain = DOMAIN_DV;

            successCallback(response);
        },
        error: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = (dvs);
            response.importStat.domain = DOMAIN_DV;

            errorCallback(response);
        }
    });

    return def;
}

function addImportStatToResponse(index,metadata,domain,outcome){
   var importStat = {};
    importStat.index=index;
    importStat.metadata = metadata;
    importStat.domain = domain;
    importStat.outcome = outcome;

}