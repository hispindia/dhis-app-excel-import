//Controller for column show/hide
skeletonApp.controller('LeftBarMenuController',
        function($scope,
                $location) {
    $scope.panel = function(){
        $location.path('/panel').search();
    }; 
    

});