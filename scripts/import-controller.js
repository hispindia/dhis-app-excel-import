/**
 * Created by harsh on 6/5/16.
 */


excelImport
    .controller('importController', function( $rootScope,
                                            $scope,
                                              $timeout){


        $scope.xlsxFile = undefined;

        $scope.importBegins = function(){
            var file = document.getElementById('fileInput').files[0];
            var filename = $('#fileInput').val().split('\\').pop();
            var extension = filename.split('.').pop();

            if (!file) {
                alert("Error Cannot find the file!");
                return;
            }
            //else if(extension.toLowerCase() != 'xlsx'){
            //    alert('select file with extension .xlsx only!');
            //    return;
            //}

            var reader = new FileReader();
            reader.readAsBinaryString(file);

            reader.onload = function(e) {
                var data = e.target.result;
                var wb = XLSX.read(data, {type: 'binary'});

                var data_sheet =  XLSX.utils.sheet_to_json(wb.Sheets[DATA_SHEETNAME]);
                var headers = assembleHeaderInfo(data_sheet[0]);

                var headersMapGrpByDomain = prepareMapGroupedById(headers,"domain");
                $timeout(function(){
                    $scope.initialSummary = prepareListFromMap(headersMapGrpByDomain);
                    $scope.importSummary = {
                        requestCount : 0,
                        successCount : 0,
                        errorCount : 0
                    }
                    $scope.importSummaryMap = [];
                    importHandler($scope.initialSummary,data_sheet,notificationCallBack);
                })


                function notificationCallBack(response){
                    var importStat = response.importStat;

                    var summaryItem = {};
                    summaryItem.domain = importStat.domain;
                    summaryItem.metadata = (importStat.metadata);
                    console.log(response.status );
                    var conflicts = getConflicts(response);
                    summaryItem.conflicts = conflicts;

                    debugger
                    if (response.status == "OK")
                    summaryItem.httpResponse = response;
                    else{
                        summaryItem.httpResponse = JSON.parse(response.responseText);
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
                            $scope.importSummary.requestCount = $scope.importSummary.requestCount+1;
                        })
                }

            };

        }

        $scope.getSet = function(){
            var file = document.getElementById('fileInput').files[0];

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
                            requestCount : 0,
                            successCount : 0,
                            errorCount : 0
                        }
                        $scope.importSummaryMap = [];
                        importHandler($scope.initialSummary,data.data,notificationCallBack);
                    })
                }
            });

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

                debugger
                if (response.status == "OK") {
                    summaryItem.httpResponse = response;
                    $scope.importSummary.successCount = $scope.importSummary.successCount + 1;
                }else{
                    summaryItem.httpResponse = JSON.parse(response.responseText);
                    $scope.importSummary.errorCount = $scope.importSummary.errorCount+1;

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
                    $scope.importSummary.requestCount = $scope.importSummary.requestCount+1;
                })
            }

        }

    });
