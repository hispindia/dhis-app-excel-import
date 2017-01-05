/**
 * Created by Priyanka Bawa on 03-01-2017.
 */


excelImport.directive('calendar', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attr, ngModel) {
            $(el).datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: function (dateText) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(dateText);
                    });
                }
            });
        }
    };
});

excelImport
    .controller('deleteController', function( $rootScope,
                                                   $scope,
                                                   $timeout,
                                                   MetadataService){

        const SQLVIEW =  "LvtkCi9JlZO";

        $scope.deleteRows = false;
       var def = $.Deferred();

        jQuery(document).ready(function () {
            MetadataService.getAllPrograms().then(function(prog) {
                $scope.allPrograms = prog.programs;
                $scope.programs = [];
                for(var i=0; i<prog.programs.length;i++){
                    if(prog.programs[i].withoutRegistration == true){
                        $scope.programs.push(prog.programs[i]);
                    }
                }
            });        })
        $timeout(function(){
            $scope.date = {};
            $scope.date.startDate = new Date();
            $scope.date.endDate = new Date();
        },0);

        //initially load tree
       // selection.load();

        // Listen for OU changes
      /*  selection.setListenerFunction(function(){
            //getAllPrograms();
            $scope.selectedOrgUnitUid = selection.getSelected();
            loadPrograms();
        },false);*/

     /*   loadPrograms = function(){
            MetadataService.getOrgUnit($scope.selectedOrgUnitUid).then(function(orgUnit){
                $timeout(function(){
                    $scope.selectedOrgUnit = orgUnit;
                });
            });
        }*/

        getAllPrograms = function(){
            MetadataService.getAllPrograms().then(function(prog) {
                $scope.allPrograms = prog.programs;
                $scope.programs = [];
                for(var i=0; i<prog.programs.length;i++){
                    if(prog.programs[i].withoutRegistration == true){
                        $scope.programs.push(prog.programs[i]);
                    }
                }
            });
        }

        $scope.updateStartDate = function(startdate){
            $scope.startdateSelected = startdate;
        };

        $scope.updateEndDate = function(enddate){
            $scope.enddateSelected = enddate;
        };

        $scope.delete = function(program){

            var param = "var=psuid:"+program.programStages[0].id + "&var=startdate:"+$scope.startdateSelected+"&var=enddate:"+$scope.enddateSelected;

            MetadataService.getSQLView(SQLVIEW, param).then(function (eventdata) {
                $scope.eventdata = eventdata;
               deleteEvent(0,$scope.eventdata);

                   $timeout( function(){ $scope.mymessage = "Event deletion success"; }, 2000);

            })

        };
        function completeDel(index,data){
            deleteEvent(index+1,data);

        }
        function deleteEvent(index,eventdata) {

            if (index == eventdata.rows.length){
                def.resolve("");
                return
            }

            var dhis2Event = eventdata.rows[index];

            $.ajax({
                async:false,
                type: "DELETE",
                url: '../../events/'+dhis2Event[1],
                success: function(response){
                    $scope.deleteRows = true;

                },
                error: function(response){
                    $scope.deleteRows = false;

                }

            });
            completeDel(index,eventdata);

        }

    /*    function deleteEvent(eventdata) {

           for(var i = 0; i < eventdata.rows.length; i++) {

                var dhis2Event = eventdata.rows[i];
                var def = $.Deferred();
                $.ajax({
                    async:false,
                    type: "DELETE",
                    url: '../../events/'+dhis2Event[1],
                    success: function(response){
                        $scope.deleteRows = true;
                        def.resolve(response);

                    },
                    error: function(response){
                        $scope.deleteRows = false;
                        def.resolve(response);
                    }

                });

           }
            return def;
        }*/

    });
