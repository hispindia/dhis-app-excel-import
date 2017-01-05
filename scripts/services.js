/**
 * Created by hisp on 2/12/15.
 */

var excelImportAppServices = angular.module('excelImportAppServices', [])
    .service('MetadataService',function($http){
       return {
           getOrgUnit : function(id){
               var def = $.Deferred();
               $.ajax({
                   type: "GET",
                   dataType: "json",
                   contentType: "application/json",
                   url: '../../organisationUnits/'+id+".json",
                   success: function (data) {
                       def.resolve(data);
                   }
               });
               return def;
           },
           getAllPrograms : function () {
               var def = $.Deferred();
               $.ajax({
                   type: "GET",
                   dataType: "json",
                   contentType: "application/json",
                   url: '../../programs.json?fields=id,name,withoutRegistration,programTrackedEntityAttributes[*],programStages[id,name,programStageDataElements[id,dataElement[id,name,optionSet[options[code,displayName]],sortOrder]]]&paging=false',
                   success: function (data) {
                       def.resolve(data);
                   }
               });
               return def;
           },
           getSQLView : function(sqlViewUID,param){
               var def = $.Deferred();
               $.ajax({
                   type: "GET",
                   dataType: "json",
                   contentType: "application/json",
                   url: '../../sqlViews/'+sqlViewUID+"/data?"+param,
                   success: function (data) {
                       def.resolve(data);
                   }
               });
               return def;
           }

    }
    });
