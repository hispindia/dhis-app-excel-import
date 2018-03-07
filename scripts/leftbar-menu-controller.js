//Controller for column show/hide
dataImportApp.controller('LeftBarMenuController',
        function($scope,$location) {

        $scope.showAuditReport = function(){
                $location.path('/data-import').search();
            };
        });