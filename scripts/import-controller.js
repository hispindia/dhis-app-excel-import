/**
 * Created by harsh on 6/5/16.
 */


excelImport
    .controller('importController', function( $rootScope,
                                            $scope,
                                              $timeout){


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
                        $scope.importSummary = {
                        }
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
                var headers = assembleHeaderInfo(prepareKeyList(data_sheet[0]));

                var headersMapGrpByDomain = prepareMapGroupedById(headers,"domain");
                $timeout(function(){
                    $scope.initialSummary = prepareListFromMap(headersMapGrpByDomain);
                    $scope.importSummary = {}
                    $scope.importSummaryMap = [];
                    importHandler($scope.initialSummary,data_sheet,notificationCallBack);
                })
            }

            function prepareKeyList(data){
                var list = [];
                for (key in data){
                    list.push(key);
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

            summaryItem.status = response.statusText;
            summaryItem.row = importStat.index;

            if (!$scope.importSummary[importStat.index]){
                $scope.importSummary[importStat.index] = [];
                // $scope.importSummaryMap[importStat.index] = $scope.importSummary[importStat.index];
                $scope.importSummary[importStat.index].push(summaryItem);
            }else{
                $scope.importSummary[importStat.index].push(summaryItem);
            }

            $timeout(function(){
                debugger
                $scope.requestStats.requestCount = $scope.requestStats.requestCount+1;
            })
        }

    });
