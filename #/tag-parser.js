/**
 * Created by harsh on 19/12/16.
 */

import dhis2API from '../dhis2API/dhis2API';
import * as CONSTANTS from './constants';


dhis2API.prototype.tagRetriever = tagRetriever;

var api = new dhis2API();

function tagParser(){
    const SNOM = api.getSchemaNameToObjectMap();
    const extractTextRegEx = /[a-zA-Z]+/;
    const extractNumberRegEx = /[0-9]+/;

    this.parseList = function(list){
        var result = [];
        var inline = false;

        for (var key in list){
            var parsedObject = parseTag(list[key]);
            if (parsedObject){
                result.push(parsedObject);
                if (parsedObject.inline_index){
                    inline = true;
                }
            }
        }
        return {headers : result, inline : inline};
    }

    function parseTag(tag){
        try {
            var whole = tag.split(CONSTANTS.FIRST_DELIMITER)[1];

            whole = whole.split(CONSTANTS.SECOND_DELIMITER);

            var domain = getValidDomain(whole[0]);
            if (!domain) {
                return null
            }

            whole = whole[1];
            if (whole.split(CONSTANTS.THIRD_DELIMITER)) {
                whole = whole.split(CONSTANTS.THIRD_DELIMITER);
            }

            var field = whole[0];
            var args = whole[1];

            var modifiers = [];

            if (field.indexOf('[') != -1) {
                whole = field.split('[');

                field = whole[0];
                modifiers = whole[1].substr(0, whole[1].length - 1);

                if (modifiers.split(' ')){
                    modifiers = modifiers.split(' ');
                }
            }

             field = getValidField(domain.name,field);
            if (!field){ return null }

            return {
                key : tag,
                domain : domain.name,
                field : field.name,
                args : args,
                property : field.property,
                modifiers : modifiers,
                inline_index : domain.index,
                domain_key : domain.name + (domain.index?domain.index:"")
            }

        }catch(e){
            console.log("tag parse error = "+e.toString());
            return null;
        }

        return null;
    }

    function getValidDomain(domain){

        var index = domain.match(extractNumberRegEx);
        if (index){
            domain = domain.match(extractTextRegEx)[0];
            index = index[0];
        }

        if (CONSTANTS.ALIAS_DOMAINS[domain]){
            domain = CONSTANTS.ALIAS_DOMAINS[domain]
        }

        if (SNOM[domain]){
            return {name : domain, index : index};
        }

        return false;
    }

    function getValidField(domain,field){
        var _field = field;
        if (CONSTANTS.ALIAS_FIELDS[field]){
            _field = CONSTANTS.ALIAS_FIELDS[field];
        }

        if (CONSTANTS.ALIAS_DOMAIN_WISE_FIELDS[domain]){
            if (CONSTANTS.ALIAS_DOMAIN_WISE_FIELDS[domain][field]){
                _field = CONSTANTS.ALIAS_DOMAIN_WISE_FIELDS[domain][field];
            }
        }

        var DOMAIN = SNOM[domain];

        if (DOMAIN.properties[_field]){
            return {name : _field,property : DOMAIN.properties[_field]}
        }

       return false;
    }

    this.getRetriever = function(){
        return 'tagRetriever';
    }

    this.getHeaderbyField = function(field, headers) {
        for (var i = 0; i < headers.length; i++) {
            if (headers[i].field == field) {
                return headers[i];
            }
        }
        return null;
    }
}

function tagRetriever(args,headers,data){
    var obj = {};
    var domainObj;
    var _errors = [];

    retrieve(0,headers);
    function retrieve(key,headers){
        if (key == headers.length){
            args.afterThat(null,{domain : headers[0].domain,apiObj:obj,domainObj : domainObj ,errors: _errors});
            return;
        }
        var property = headers[key].property;
        var value = headers[key].args?headers[key].args : data[headers[key].key];
        var dataValue = data[headers[key].key];

        modifierOperations({
            afterThat : extractValues,
            teiApiObject : args.teiApiObject,
            programStage : args.programStage
        },property,headers[key],value,dataValue);

        function extractValues(error,uid,mObj){
            if (error){
                console.log("possible lookup error");
                if (error.type == "eventDataValueLookup"){
                        _errors.push(error)
                }

            }

                if (uid) {
                    value = uid;
                    domainObj = mObj;
                }

            if (property.collection){

                if (!obj[property.fieldName]){
                    obj[property.fieldName] = [];
                }

                var collectionObj = {}
                collectionObj[property["apiSchema"].key] = headers[key].args;
                collectionObj[property["apiSchema"].value] = data[headers[key].key];
                obj[property.fieldName].push(collectionObj);

            }else{
                switch(property.propertyType){
                    case "REFERENCE" :
                    default :
                        if (property.apiAlias){
                            obj[property.apiAlias] = value;
                        }else{
                            obj[property.fieldName] = value;
                        }
                        break;
                }
            }

            retrieve(key+1,headers);
        }

    }

    function modifierOperations(args,property,header,value,dataValue){

        if (header.modifiers.length == 0){
            default_call(null,null,null);
        }else{
            for (var key in header.modifiers){
                var modifier = header.modifiers[key];
                var modifierArgs = modifier.split('-');

                if (modifierArgs){
                    modifier = modifierArgs[0];
                    modifierArgs = modifierArgs[1];
                }

                if (modifier == "lookup"){
                    lookupObj();
                }else{
                    default_call(null,null,null)
                }
            }
        }

        function default_call(error,response,body){
            args.afterThat(error,response,body);
        }

        function lookupObj(){

            function callback(error,filteredEvents){

                if (error){

                }else{

                    if (filteredEvents.length == 1){
                        args.afterThat(null,filteredEvents[0].event,filteredEvents[0]);
                    }else if (filteredEvents.length ==0){
                        args.afterThat({
                                        type : "eventDataValueLookup",
                                        conflicts : "NoEvent"
                                        });
                    }else {
                        args.afterThat({
                            type : "eventDataValueLookup",
                            conflicts : "MultipleEvent"
                        });

                    }
                }


            }
            if (header.domain == "event" && header.field == "dataValues"){

                api.getEventByDV({
                    then : callback
                },header.args,
                    dataValue,
                    args.teiApiObject.trackedEntityInstance,
                    args.teiApiObject.orgUnit,
                    args.programStage);

            return;
            }

            switch(property.propertyType){
                case "REFERENCE" :
                    api.getObjByField({
                    afterThat : args.afterThat
                },header.field,modifierArgs,value);
                    break;
                case "CUSTOM_TEIATTR" :
                    api.getTEIByAttr({
                        afterThat : args.afterThat
                    },value,dataValue);
                    break;
                default :
                    args.afterThat(null,null,null);
            }

        }
    }
}

module.exports = tagParser;