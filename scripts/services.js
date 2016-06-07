/**
 * Created by hisp on 2/12/15.
 */

var excelImportAppServices = angular.module('excelImportAppServices', [])
    .service('MetadataService',function(){
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
           }
       }
    });
