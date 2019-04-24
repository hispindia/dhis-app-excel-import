/**
 * Created by harsh on 9/5/16.
 */

var dhis2API = dhis2API || {};

dhis2API.
    trackedEntityInstance = function(tei){

    if (tei){
        this.uid = tei.trackedEntityInstance;
        this.orgUnit = tei.orgUnit;
        this.trackedEntityType = tei.trackedEntityType;
        this.attributesMap = [];
        this.attributes = [];

        for (var i=0;i<tei.attributes.length;i++){
            this.attributesMap[tei.attributes[i].attribute] = tei.attributes[i];
            this.attributes.push(this.attributesMap[tei.attributes[i].attribute]);
        }
    }else{

        this.orgUnit = "";
        this.trackedEntityType = "";
        this.attributes = [];
    }
}
dhis2API.trackedEntityInstance.prototype.getAPIObject = function(){
    var tei = {
        orgUnit : this.orgUnit,
        trackedEntityType : this.trackedEntityType,
        attributes : this.attributes
    }
    return tei;
}

dhis2API.trackedEntityInstance.prototype.excelImportPopulator = function(header,data,ouUID){

    if(ouUID){
        this.orgUnit = ouUID;
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
            case FIELD_TRACKED_ENTITY:
                if (header[i].args){
                    this.trackedEntityType = header[i].args;
                }else{
                    this.trackedEntityType = data[header[i].key];
                }
                break
            case FIELD_ATTRIBUTE:
                this.attributes.push({
                    attribute: header[i].args,
                    value:  data[header[i].key]
                })
                break
            case FIELD_UID_LOOKUP_BY_ATTR:
                this.attributes.push({
                    attribute: header[i].args,
                    value:  data[header[i].key]
                })
                break

        }
    }
}

dhis2API.trackedEntityInstance.prototype.ObjectPopulator = function(header,data){

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
                    this.trackedEntityType = header[i].args;
                }else{
                    this.trackedEntityType = data[header[i].key];
                }
                break
            case FIELD_ATTRIBUTE:
                if (this.attributesMap[header[i].args] == undefined){
                    this.attributes.push({
                        attribute: header[i].args,
                        value:  data[header[i].key]
                    });
                    break;
                }
                this.attributesMap[header[i].args].value = data[header[i].key];
                break
        }
    }
}
dhis2API.trackedEntityInstance.prototype.POST = function(successCallback,errorCallback,index,lookUpIndex){
    var tei = this.getAPIObject()
    var def = $.Deferred();

    $.ajax({
        type: "POST",
        dataType: "json",
        async : true,
        contentType: "application/json",
        url: '../../trackedEntityInstances',
        data: JSON.stringify(tei),
        success: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = JSON.stringify(tei);
            response.importStat.domain = DOMAIN_TEI;
            response.lookUpIndex = lookUpIndex;

            successCallback(response);
        },
        error: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = (tei);
            response.importStat.domain = DOMAIN_TEI;
            response.lookUpIndex = lookUpIndex;

            errorCallback(response);
        }
    });

    return def;
}

dhis2API.trackedEntityInstance.prototype.PUT = function(successCallback,errorCallback,index,legacy_lookupindex){
    var tei = this.getAPIObject()
    var def = $.Deferred();

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        url: '../../trackedEntityInstances/'+this.uid,
        data: JSON.stringify(tei),
        success: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = JSON.stringify(tei);
            response.importStat.domain = DOMAIN_TEI_UPDATE;
            response.lookUpIndex = legacy_lookupindex;
            successCallback(response);
        },
        error: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = (tei);
            response.importStat.domain = DOMAIN_TEI_UPDATE;
            response.lookUpIndex = legacy_lookupindex;

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

    if (tei){
        if (tei.length >0){
            this.tei = tei[0].trackedEntityInstance;
            this.orgUnit = tei[0].orgUnit;
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
        async : true,
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
dhis2API.enrollment.prototype.PUT = function(successCallback,errorCallback,index,enUid){
    var enrollment = this.getAPIObject();
    var def = $.Deferred();

    $.ajax({
        type: "PUT",
        dataType: "json",
        async : true,
        contentType: "application/json",
        url: '../../enrollments/'+enUid,
        data: JSON.stringify(enrollment),
        success: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = JSON.stringify(enrollment);
            response.importStat.domain = DOMAIN_ENROLLMENT;
            response.message = "Update successful";
            successCallback(response);
        },
        error: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = (enrollment);
            response.importStat.domain = DOMAIN_ENROLLMENT;
            response.message = "Update successful";
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
            this.orgUnit = tei[0].orgUnit;
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
        async : true,
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


dhis2API.event.prototype.PUT = function(successCallback,errorCallback,index,evUID){
    var event = this.getAPIObject();
    var def = $.Deferred();

    $.ajax({
        type: "PUT",
        dataType: "json",
        async : true,
        contentType: "application/json",
        url: '../../events/'+evUID,
        data: JSON.stringify(event),
        success: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = event;
            response.importStat.domain = DOMAIN_EVENT;
            response.message = "Update successful";
            response.lastImported = evUID;
            successCallback(response);
        },
        error: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = (event);
            response.importStat.domain = DOMAIN_EVENT;
            response.message = "Update failed";

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

dhis2API.dataElement = function(){
    this.name = undefined;
    this.shortName = undefined;
    this.aggregationType = undefined;
    this.domainType = undefined;
    this.valueType = undefined;
    this.categoryCombo = undefined;
    this.description = undefined;
    this.aggregationLevels = undefined;
}

dhis2API.dataElement.prototype.excelImportPopulator = function(header,data){

/* TODO  */
    for (var i=0;i<header.length;i++){
        switch(header[i].field){
            case FIELD_NAME :
                if (header[i].args){
                    this.name = header[i].args;
                }else{
                    this.name = data[header[i].key];
                }
                break
            case FIELD_SHORTNAME:
                if (header[i].args){
                    this.shortName = header[i].args;
                }else{
                    this.shortName = data[header[i].key];
                }
                break
            case FIELD_DESCRIPTION:
                if (header[i].args){
                    this.description = header[i].args;
                }else{
                    this.description = data[header[i].key];
                }
                break
            case FIELD_AGGREGATION_TYPE :
                if (header[i].args){
                    this.aggregationType = header[i].args;
                }else{
                    this.aggregationType = data[header[i].key];
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

dhis2API.dataElement.prototype.getAPIObject = function(){
    var de = {
        name :this.name,
    shortName : this.shortName,
    aggregationType : this.aggregationType,
    domainType : this.domainType,
    valueType : this.valueType,
            categoryCombo : this.categoryCombo,
            description :this.description,
        aggregationLevels :this.aggregationLevels
    }
    return de;
}

dhis2API.dataElement.prototype.POST = function(successCallback,errorCallback,index){
    var de = this.getAPIObject()
    var def = $.Deferred();

    $.ajax({
        type: "POST",
        dataType: "json",
        async : true,
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
    this.period = undefined;
    this.orgUnit= undefined;
    this.value= undefined
    this.storedBy= undefined;

    this.decocList = [];

    this.decoc = {
        dataElement : undefined,
        categoryOptionCombo:undefined,
        value:undefined
    }

    this.dvs = {dataValues : []};
    
}

dhis2API.dataValue.prototype.getAPIObject = function(){


    for (var i=0;i<this.decocList.length;i++){
        var dv = {
            dataElement:this.decocList[i].dataElement,
            period:this.period,
            orgUnit:this.orgUnit,
            categoryOptionCombo:this.decocList[i].categoryOptionCombo,
            value:this.decocList[i].value,
            storedBy:this.storedBy
        }
        this.dvs.dataValues.push(dv);
    }
    return this.dvs;
}

dhis2API.dataValue.prototype.excelImportPopulator = function(header,data, ouUid){

    this.orgUnit = ouUid;

    for (var i=0;i<header.length;i++){
        switch(header[i].field){
            case FIELD_ORG_UNIT :
                if (header[i].args){
                    this.orgUnit = header[i].args;
                }else{
                    this.orgUnit = data[header[i].key];
                }
                break
            case FIELD_DECOC:
                if (header[i].args) {
                var decocHeader = header[i].args.split(":");
                    var decoc = {  dataElement : undefined,
                        categoryOptionCombo:undefined,
                        value:undefined
                    };
                    if (decocHeader.length == 2) {
                        decoc.dataElement = decocHeader[0];
                        decoc.categoryOptionCombo = decocHeader[1];
                        decoc.value = data[header[i].key];

                        this.decocList.push(decoc);
                    } else {
                        alert("decoc not given properly!")
                        return;
                    }
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

        }
    }
}

dhis2API.dataValue.prototype.POST = function(successCallback,errorCallback,index){
    var dvs = this.getAPIObject()
    var def = $.Deferred();

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: '../../dataValueSets',
        data: JSON.stringify(dvs),
        success: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = dvs;
            response.importStat.domain = DOMAIN_DVS;

            successCallback(response);
        },
        error: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = (dvs);
            response.importStat.domain = DOMAIN_DVS;

            errorCallback(response);
        }
    });

    return def;
}

dhis2API.user = function(){

    this.firstName= undefined;
    this.surname=undefined;
    this.email= undefined;
    this.phoneNumber = undefined;
    this.userCredentials = {
	"userInfo": {},
        "username": undefined,
        "password": undefined,
        "userRoles": [ ]
    };
    this.organisationUnits= [];
    this.userGroups = [  ]

}

dhis2API.user.prototype.getAPIObject = function(){
    var user = {
	"id" : this.userCredentials.userInfo.id,
        "firstName": this.firstName,
        "surname": this.surname,
        "email": this.email,
        "phoneNumber": this.phoneNumber,
        "userCredentials": {
            "userInfo": this.userCredentials.userInfo,
            "username": this.userCredentials.username,
            "password": this.userCredentials.password,
            "userRoles": []
        },
        "organisationUnits": [ ],
        "userGroups": []
    }

    for (var i=0;i<this.userCredentials.userRoles.length;i++){
        user.userCredentials.userRoles.push(this.userCredentials.userRoles[i]);
    }

    for (var i=0;i<this.organisationUnits.length;i++) {
        user.organisationUnits.push(this.organisationUnits[i]);
    }

    for (var i=0;i<this.userGroups.length;i++){
            user.userGroups.push(this.userGroups[i]);
    }

    return user;
}

dhis2API.user.prototype.excelImportPopulator = function(header,data){

    for (var i=0;i<header.length;i++){
        switch(header[i].field){

            case FIELD_FIRST_NAME:
                if (header[i].args){
                    this.firstName = header[i].args;
                }else{
                    this.firstName = data[header[i].key];
                }
                break
            case FIELD_SURNAME:
                if (header[i].args){
                    this.surname = header[i].args;
                }else{
                    this.surname = data[header[i].key];
                }
                break
            case FIELD_EMAIL:
                if (header[i].args){
                    this.email = header[i].args;
                }else{
                    this.email = data[header[i].key];
                }
            break
            
            case FIELD_PHONE:
                if (header[i].args){
                    this.phoneNumber = header[i].args;
                }else{
                    this.phoneNumber = data[header[i].key];
                }
                break
            case FIELD_USERNAME:
                if (header[i].args){
                    this.userCredentials.username = header[i].args;
                }else{
                    this.userCredentials.username = data[header[i].key];
                }
                break
            case FIELD_PASSWORD:
                if (header[i].args){
                    this.userCredentials.password = header[i].args;
                }else{
                    this.userCredentials.password = data[header[i].key];
                }
                break
            case FIELD_USER_ROLE:
                if (header[i].args){
                    this.userCredentials.userRoles.push({
                        id: header[i].args
                    })
                }else{
                    this.userCredentials.userRoles.push({
                        id:  data[header[i].key]
                    })
                }

                break
            case FIELD_USER_GROUP:
                if (header[i].args){
                    this.userGroups.push({
                        id: header[i].args,
                    })
                }else{
                    this.userGroups.push({
                        id:  data[header[i].key]
                    })
                }

                break
            case FIELD_ORG_UNIT:
                if (header[i].args){
                    this.organisationUnits.push({
                        id: header[i].args,
                    })
                }else{
                    this.organisationUnits.push({
                        id:  data[header[i].key]
                    })
                }

            break
	     case FIELD_USER_INFO:
              if (header[i].args){
                    this.userCredentials.userInfo.id = header[i].args;
                }else{
                    this.userCredentials.userInfo.id = data[header[i].key];
                }
                break
        }
    }
}

dhis2API.user.prototype.POST = function(successCallback,errorCallback,index){
    var user = this.getAPIObject()
    var def = $.Deferred();

    $.ajax({
        type: "POST",
        dataType: "json",
        async : true,
        contentType: "application/json",
        url: '../../users',
        data: JSON.stringify(user),
        success: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = user;
            response.importStat.domain = DOMAIN_USER;

            successCallback(response);
        },
        error: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = (user);
            response.importStat.domain = DOMAIN_USER;

            errorCallback(response);
        }
    });

    return def;
}

dhis2API.user.prototype.PUT = function(successCallback,errorCallback,index,existingUser){
    var user = this.getAPIObject();
    user.userCredentials.id = existingUser.userCredentials.id; 
    //delete user.userCredentials.username;
    var def = $.Deferred();
    
    $.ajax({
        type: "PUT",
        dataType: "json",
        async : true,
        contentType: "application/json",
        url: '../../users/'+existingUser.id,
        data: JSON.stringify(user),
        success: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = user;
            response.importStat.domain = DOMAIN_USER;

            successCallback(response);
        },
        error: function(response){
            response.importStat = {};
            response.importStat.index=index;
            response.importStat.metadata = (user);
            response.importStat.domain = DOMAIN_USER;

            errorCallback(response);
        }
    });

    return def;
}


dhis2API.user.prototype.checkIfAlreadyExist = function(username,createCallback,updateCallback){
    var def = $.Deferred();

    $.ajax({
        type: "GET",
        dataType: "json",
        async : true,
        contentType: "application/json",
        url: '../../users?fields=id,userCredentials[id]&filter=userCredentials.username:eq:'+username,
        success: function(response){
            if (response.users.length == 0){
                createCallback();
            }else{
                updateCallback(response.users[0]);
            }

            
        },
        error: function(response){debugger
         
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
