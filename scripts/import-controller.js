/**
 * Created by harsh on 6/5/16.
 */


excelImport
    .controller('importController', function( $rootScope,
                                            $scope,
                                              $timeout,
                                              MetadataService){

MetadataService.getRootOrgUnit().then(function(orgUnits){
ROOT_OU_UID = orgUnits[0].id;

})
        $scope.xlsxFile = undefined;
        $scope.requestStats = {
            requestCount : 0,
            successCount : 0,
            errorCount : 0
        };

        function parseCSV(file){
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: function(results) {
                    data = results;
                    var headers = assembleHeaderInfo(data.meta.fields);
                    var headersMapGrpByDomain = prepareMapGroupedById(headers,"domain");

                    $timeout(function(){
                        $scope.initialSummary = prepareListFromMap(headersMapGrpByDomain);
                        $scope.importSummary = {};
                        $scope.importSummaryMap = [];
                        importHandler($scope.initialSummary,data.data,notificationCallBack);
                    })
                }
            });
        }

        function parseExcel(file){
            var reader = new FileReader();
            reader.readAsBinaryString(file);

            reader.onload = function(e) {
                var data = e.target.result;
                var wb = XLSX.read(data, {type: 'binary'});

                var data_sheet =  XLSX.utils.sheet_to_json(wb.Sheets[DATA_SHEETNAME]);
                var metadata_sheet = XLSX.utils.sheet_to_json(wb.Sheets[METADATA_SHEETNAME]);

                if (metadata_sheet.length != 0){
                    var headers = assembleHeaderInfo(prepareKeyList(metadata_sheet[0],true));
                }else{
                    var headers = assembleHeaderInfo(prepareKeyList(data_sheet[0]));

                }

                var headersMapGrpByDomain = prepareMapGroupedById(headers,"domain");
                $timeout(function(){
                    $scope.initialSummary = prepareListFromMap(headersMapGrpByDomain);
                    $scope.importSummary = {};
                    $scope.importSummaryMap = [];
                    //importHandler($scope.initialSummary,data_sheet,notificationCallBack);
                    register($scope.initialSummary,data_sheet,notificationCallBack);
                })
            }

            function prepareKeyList(data,isMappingSeparate){
                var list = [];
                for (key in data){
                    if (isMappingSeparate){
                        list.push({key : key, data :data[key]});
                    }else{
                        list.push({key : key, data :key});
                    }
                }
                return list;
            }
        }
        $scope.getSet = function(){
           
            var file = document.getElementById('fileInput').files[0];

            if (!file) {
                alert("Error Cannot find the file!");
                return;
            }

            switch(file.type){
                case "text/csv" :  parseCSV(file);
                    break
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :
                case "application/vnd.ms-excel" :
                    parseExcel(file);
                    break
                default : alert("Unsupported Format");
                    break
            }
        }

        function notificationCallBack(response){
            var importStat = response.importStat;

            var summaryItem = {};
            summaryItem.domain = importStat.domain;
            summaryItem.metadata = (importStat.metadata);
            console.log(response.status );
            var conflicts = getConflicts(response);
            var reference = findReference(response);
            summaryItem.reference = reference;
            summaryItem.conflicts = conflicts;

            if (response.status == "OK") {
                summaryItem.httpResponse = response;
                $scope.requestStats.successCount = $scope.requestStats.successCount + 1;
            }else{
                if (response.responseText){
                    if (isJson(response.responseText)){
                        summaryItem.httpResponse = JSON.parse(response.responseText);
                        $scope.requestStats.errorCount = $scope.requestStats.errorCount+1;
                    }
                }
            }


            summaryItem.status = findStatus(response);
            summaryItem.row = importStat.index;

            /* case for datavalue sets */
            if (response.dataSetComplete){
                if (response.conflicts){
                    summaryItem.status = "Conflict";
                    $scope.requestStats.errorCount = $scope.requestStats.errorCount+1;
                }else{
                    summaryItem.httpResponse = response;
                    $scope.requestStats.successCount = $scope.requestStats.successCount + 1;
                }

            }

            if (!$scope.importSummary[importStat.index]){
                $scope.importSummary[importStat.index] = [];
                // $scope.importSummaryMap[importStat.index] = $scope.importSummary[importStat.index];
                $scope.importSummary[importStat.index].push(summaryItem);
            }else{
                $scope.importSummary[importStat.index].push(summaryItem);
            }

            $timeout(function(){

                $scope.requestStats.requestCount = $scope.requestStats.requestCount+1;
            })
        }

    });
