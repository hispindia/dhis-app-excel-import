/**
 * Created by hisp on 2/12/15.
 */

var excelImportAppServices = angular.module('excelImportAppServices', [])
    .service('MetadataService',function( $q,$http ){
       return {
           getRootOrgUnit : function(){
               var def = $.Deferred();
               $.ajax({
                   type: "GET",
                   dataType: "json",
                   contentType: "application/json",
                   url: '../../organisationUnits?level=1&fields=id,name',
                   success: function (data) {
                       def.resolve(data.organisationUnits);
                   }
               });
               return def;
           },

           getActiveEvenList : function( root_orgUnit ){
               var def = $.Deferred();
               $.ajax({
                   type: "GET",
                   dataType: "json",
                   contentType: "application/json",
                   url: '../../events.json?skipPaging=true&program=' + TRACKER_PROGRAM + '&orgUnit=' + root_orgUnit + '&ouMode=DESCENDANTS&status=ACTIVE',
                   success: function (data) {
                       def.resolve(data.events);
                   }
               });
               return def;
           },

           getOrgUnit : function(id){
               var def = $.Deferred();
               $.ajax({
                   type: "GET",
                   dataType: "json",
                   contentType: "application/json",
                   url: '../../organisationUnits/'+id+".json?fields=id,name&paging=false",
                   success: function (data) {
                       def.resolve(data);
                   }
               });
               return def;
           },


           getDataElementsDetails: function(){

               var categoryCombos={};
               var dataElements = {}
               //This is to hold the data elements with their codes and have the whole DE object referenced.
               var dataElementObjects = {}
               //this is used to distinguish which data element contains which attribute value.
               dataElementObjects.attributeGroups={}
               var deferred = $q.defer();
               $.ajax({
                   type: "GET",
                   async: false,
                   dataType: "json",
                   contentType: "application/json",
                   url: '../../dataElements.json?paging=false&fields=id,code,displayName,formName,attributeValues[value,attribute[id,name]]',

                   success: function (response) {

                       response.dataElements.forEach(
                           de => {
                               dataElements[de.id] = de.formName ? de.formName : de.displayName

                               //remap the attributeOptionValue with code
                               de.attributeValues.forEach(attributeValue=>{
                                   de[attributeValue.attribute.code]=attributeValue.value
                                   if(!dataElementObjects.attributeGroups[attributeValue.value]){
                                       dataElementObjects.attributeGroups[attributeValue.value] =[]
                                   }
                                   dataElementObjects.attributeGroups[attributeValue.value].push(de.id)
                               })

                               dataElementObjects[de.id]=de
                               dataElementObjects[de.code]=de
                           }
                       )

                       deferred.resolve(dataElementObjects);
                   },
                   error: function (response) {
                       console.log("error : " + response.status );
                       deferred.resolve(dataElementObjects);
                   },
                   warning: function (response) {
                       console.log("warning : " + response.status );
                       deferred.resolve(dataElementObjects);
                   }

               });

               return deferred.promise;
           },

           getCategoryCombosOptionsDetails: function(){
               //http://127.0.0.1:8091/ippf/api/categoryCombos.json?paging=false&fields=id,displayName,code,categoryOptionCombos[id,displayName,code,categoryOptions[id,code,displayName]]
               var categoryCombos={};
               var deferred = $q.defer();
               $.ajax({
                   type: "GET",
                   async: false,
                   dataType: "json",
                   contentType: "application/json",
                   url: '../../categoryCombos.json?paging=false&fields=id,displayName,code,categoryOptionCombos[id,displayName,code,categoryOptions[id,code,displayName]]',

                   success: function (response) {
                       response.categoryCombos.forEach(categoryCombo=>{
                           categoryCombo.categoryOptions={}
                           categoryCombo.categoryOptionCombos.forEach(categoryOptionCombo=>{
                               //use the code of the options as the identifier for the categoryOptionCode
                               let categoryOptionCodes = []
                               categoryOptionCombo.categoryOptions.forEach(categoryOption => {

                                   categoryOptionCodes.push(categoryOption.code)
                                   //This adds the categoryOptions as a child of the catCombo it is usefull for DS attributes.
                                   if (!categoryCombo.categoryOptions[categoryOption.code]) {
                                       categoryCombo.categoryOptions[categoryOption.code]=categoryOption.id
                                   }
                               })
                               //sort Ids for handling more than two categoyOptions
                               categoryOptionCodes = categoryOptionCodes.sort();
                               let identifierWithOptionCodes = categoryOptionCodes.join("")
                               categoryCombo.categoryOptionCombos[identifierWithOptionCodes]=categoryOptionCombo.id
                           })
                           categoryCombos[categoryCombo.code]=categoryCombo
                       });
                       deferred.resolve(categoryCombos);
                   },
                   error: function (response) {
                       console.log("error : " + response.status );
                       deferred.resolve(categoryCombos);
                   },
                   warning: function (response) {
                       console.log("warning : " + response.status );
                       deferred.resolve(categoryCombos);
                   }

               });

               return deferred.promise;
           },

           getAggregatedDataValue: async  function( period, dataSet, de, orgUnit, cc, cp, co ){
               //http://127.0.0.1:8091/ippf/api/dataValues.json?paging=false&pe=202310&ds=gl8LF5QVSwg&de=WWsUKxEJIjm&ou=PYHQttVvQU0&cc=fkuMcyEfMf3&cp=YwbgauejLVD;PQVUYsFUhtN&co=J93YiXYQYF0
               /*
               let value = 0
               let dataValueGetResponse = {};
               var deferred = $q.defer();
               $.ajax({
                   type: "GET",
                   async: false,
                   dataType: "json",
                   contentType: "application/json",
                   //data: JSON.stringify(emailParam),
                   url:'../../dataValues.json?paging=false&pe='+period+'&ds='+dataSet+ '&de='+de+ '&ou='+orgUnit+'&cc='+cc +'&cp='+cp +'&co='+co ,
                   success: function ( response) {

                       if (response.httpStatus === "Conflict") {
                           //this means that the value does not exist so return 0
                       } else {
                           //this means that the value exists and is returned so return that.
                           value = parseInt(response[0]) + 1;
                       }
                       /*
                       if (operation === "COMPLETE") {
                           value = value + 1
                       } else if (operation === "INCOMPLETE") {
                           value = (value === 0 ? 0 : value - 1); //if value is 0 return 0 else return decremented value
                       } else {
                           //if code reaches here, then it is in an unstable state so respond with an error
                           dataValueGetResponse = {
                               response: false,
                               message: 'Received an invalid value when aggregating for dataSet' + dataSet
                           }
                       }

                       dataValueGetResponse = {
                           response: true,
                           value: value
                       }
                       deferred.resolve(dataValueGetResponse);
                   },
                   error: function (response) {

                       dataValueGetResponse = {
                           response: true,
                           value: value
                       }
                       deferred.resolve(dataValueGetResponse);
                   },
                   warning: function (response) {

                       dataValueGetResponse = {
                           response: true,
                           value: value
                       }
                       deferred.resolve(dataValueGetResponse);
                       //deferred.resolve(response);
                   }
               });

               return deferred.promise;
               */

               let value = 0
               return await $http.get('../../dataValues.json?paging=false&pe='+period+'&ds='+dataSet+ '&de='+de+ '&ou='+orgUnit+'&cc='+cc +'&cp='+cp +'&co='+co )
                   .then(function (response) {

                       //alert( response.data.httpStatusCode + " -- " + response.data.message);
                       //alert( response.data.status + " -- " + response.data.httpStatus);
                       if (response.data.httpStatus === "Conflict") {
                           //this means that the value does not exist so return 0
                       } else {
                           //this means that the value exists and is returned so return that.
                           value = parseInt(response.data[0]);
                       }

                       return {
                           response: true,
                           value: value
                       }

                       //return response.data.events[0].event;
                   })
                   .catch(function (error) {
                       console.log(error);
                       return {
                           response: true,
                           value: value
                       }
                   });

           },

           postAggregatedDataValue: function( period, dataSet, de, orgUnit, cc, cp, co, defaultValue ){

               var deferred = $q.defer();
               $.ajax({
                   type: "POST",
                   async: false,
                   dataType: "json",
                   contentType: "application/json",
                   //data: JSON.stringify(emailParam),
                   url: '../../dataValues.json?paging=false&pe='+period+'&ds='+dataSet+ '&de='+de+ '&ou='+orgUnit+'&cc='+cc +'&cp='+cp +'&co='+co +'&value='+defaultValue,
                   success: function ( aggregatedDataValuePostResponse ) {
                       deferred.resolve(aggregatedDataValuePostResponse);
                   },
                   error: function (aggregatedDataValuePostResponse) {
                       deferred.resolve( aggregatedDataValuePostResponse );
                   },
                   warning: function (aggregatedDataValuePostResponse) {
                       deferred.resolve(aggregatedDataValuePostResponse);
                       //deferred.resolve(response);
                   }
               });

               return deferred.promise;
           },

           updateEventStatus: function( tempEvent ){

               var updateEventStatus = tempEvent;

               updateEventStatus.status = "COMPLETED";

               var deferred = $q.defer();
               $.ajax({
                   type: "PUT",
                   async: false,
                   dataType: "json",
                   contentType: "application/json",
                   data: JSON.stringify(updateEventStatus),
                   url: '../../events/' + tempEvent.event,
                   success: function ( updateEventStatusResponse ) {
                       deferred.resolve(updateEventStatusResponse);
                   },
                   error: function (updateEventStatusResponse) {
                       deferred.resolve( updateEventStatusResponse );
                   },
                   warning: function (updateEventStatusResponse) {
                       deferred.resolve(updateEventStatusResponse);
                       //deferred.resolve(response);
                   }
               });

               return deferred.promise;
           }


       }
    });
