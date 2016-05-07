/**
 * Created by hisp on 2/12/15.
 */

excelImport
    .controller('PanelController', function( $rootScope,
                                            $scope,
                                            $timeout,
                                            MetadataService){

        //initially load tree
        selection.load();

        // Listen for OU changes
        selection.setListenerFunction(function(){
            $scope.selectedOrgUnitUid = selection.getSelected();
        },false);

    });
