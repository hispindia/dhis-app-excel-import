//Controller for column show/hide
msfReportsApp.controller('LeftBarMenuController',
        function($scope,$location) {

        $scope.showAuditReport = function(){
                $location.path('/audit-report').search();
            };
        });