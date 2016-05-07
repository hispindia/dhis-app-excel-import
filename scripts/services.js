/**
 * Created by hisp on 2/12/15.
 */

var excelImportAppServices = angular.module('excelImportAppServices', [])
    .service('MetadataService',function(){
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
           }
       }
    });
