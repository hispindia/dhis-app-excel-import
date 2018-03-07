//Controller for column show/hide
eAushadhiStockDataImportApp.controller('LeftBarMenuController',
        function($scope,$location) {

        $scope.showAuditReport = function(){
                $location.path('/audit-report').search();
            };
        });