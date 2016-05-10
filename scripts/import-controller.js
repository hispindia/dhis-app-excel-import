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
                })

                $scope.importSummary = {
                    requestCount : 0
                }
                $scope.importSummaryMap = [];
                importHandler($scope.initialSummary,data_sheet,notificationCallBack);

                function notificationCallBack(response){
                    var importStat = response.importStat;

                    var summaryItem = {};
                    summaryItem.domain = importStat.domain;
                    summaryItem.metadata = JSON.parse(importStat.metadata);
                    summaryItem.httpResponse = JSON.parse(response.responseText);
                    summaryItem.status = response.statusText;debugger
                    summaryItem.row = importStat.index;

                    if (!$scope.importSummaryMap[importStat.index]){
                        $scope.importSummary[importStat.index] = [];
                        $scope.importSummaryMap[importStat.index] = summaryItem;
                        $scope.importSummary[importStat.index].push($scope.importSummaryMap[importStat.index]);
                    }else{
                        $scope.importSummaryMap[importStat.index].push(summaryItem);
                    }

                    $timeout(function(){
                        $scope.importSummary.requestCount = $scope.importSummary.requestCount+1;
                    })
                }
                //var errorList = validateMetaData(TRACKER_REGISTRATION_PLUS_ENROLLMENT,metadata);
                //if (errorList.length != 0){
                //    $timeout(function(){
                //        $scope.errorList = errorList;
                //    })
                //    return;
                //}

                $timeout(function(){
                //    $scope.importSummary = importer(TRACKER_REGISTRATION_PLUS_ENROLLMENT,data_sheet,metadata);
                })

            };

        }

    });
