/**
 * Created by harsh on 6/5/16.
 */


excelImport.controller('aggregateDataController', function( $rootScope,
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


        $scope.dataElementObjects = {};
        MetadataService.getDataElementsDetails().then(function(dataElementObjectsResponse){
            $scope.dataElementObjects = dataElementObjectsResponse;
            console.log( "dataElementObjects -- " , $scope.dataElementObjects  );
        });

        $scope.tempCategoryCombos = {};
        MetadataService.getCategoryCombosOptionsDetails().then(function(response){
            $scope.tempCategoryCombos = response;
            console.log( "tempCategoryCombos -- " , $scope.tempCategoryCombos  );

            //$scope.tempCategoryCombo = $scope.tempCategoryCombos[$scope.genderAndAllAgeGroup_Code].id;
            //$scope.tempCoDefault = $scope.tempCategoryCombos[$scope.defaultCC_code].categoryOptionCombos[$scope.defaultCC_code];
            //$scope.tempCategoryOptions = $scope.tempCategoryCombos[$scope.genderAndAllAgeGroup_Code].categoryOptions[$scope.selectedTEIGender];
            //$scope.tempCategoryOptions = $scope.tempCategoryOptions + ";" + $scope.tempCategoryCombos[$scope.genderAndAllAgeGroup_Code].categoryOptions[age_range];
        });


        $scope.getEventList = function(){

            //var headersMapGrpByDomain = prepareMapGroupedById(headers,"domain");
            $timeout(function(){
                //$scope.initialSummary = prepareListFromMap(headersMapGrpByDomain);
                $scope.importSummary = {};
                $scope.importSummaryMap = [];
                console.log( "tempCategoryCombos -- " , $scope.tempCategoryCombos  );
                //importHandler($scope.initialSummary,data_sheet,notificationCallBack);

                $scope.defaultDataSet = ORGANISMS_SAMPLE_WISE_DATASET;
                $scope.antibioticWiseDataSet = ORGANISMS_ANTIBIOTIC_DATASET;
                $scope.coDefault = $scope.tempCategoryCombos[DEFAULT_CC_CODE].categoryOptionCombos[DEFAULT_CC_CODE];
                $scope.cCombo = $scope.tempCategoryCombos[SAMPLE_LOCATION_DEPT_CODE].id;

                MetadataService.getActiveEvenList( ROOT_OU_UID ).then(function(activeEvenList){
                    $scope.eventList = activeEvenList;

                    //$scope.firstEvent = $scope.eventList[0].event;
                    //alert( $scope.firstEvent  );

                    for (var i=0; i<$scope.eventList.length; i++){

                        $scope.organismDataTEI = "";
                        $scope.departmentDataTEI = "";
                        $scope.locationDataTEI = "";
                        $scope.sampleTypeDataTEI = "";
                        $scope.purposeOfSampleDataTEI = "";
                        $scope.antibioticCategoryOptionComboUIDsTEI = [];
                        $scope.tempAggregateDE = "";
                        $scope.tempCategoryOptions = "";

                        $scope.tempEventForUpdate = $scope.eventList[i];
                        $scope.isoPeriod = $scope.eventList[i].eventDate.split("T")[0].substring(0, 7).replace('-', "");
                        $scope.aggregateorgUnit = $scope.eventList[i].orgUnit;
                        alert( i + " -- " + $scope.eventList[i].event + " -- " + $scope.isoPeriod );
                        for (var j=0; j<$scope.eventList[i].dataValues.length; j++){

                            if( $scope.eventList[i].dataValues[j].dataElement === 'KVYg3tnmNMU' ){
                                $scope.departmentDataTEI = $scope.eventList[i].dataValues[j].value;
                            }
                            if( $scope.eventList[i].dataValues[j].dataElement === 'JtPSS6ksvz0' ){
                                $scope.locationDataTEI = $scope.eventList[i].dataValues[j].value;
                            }
                            if( $scope.eventList[i].dataValues[j].dataElement === 'sCu0ugyEhus' ){
                                $scope.sampleTypeDataTEI = $scope.eventList[i].dataValues[j].value;
                            }
                            if( $scope.eventList[i].dataValues[j].dataElement === 'l4kqMRq38bm' ){
                                $scope.purposeOfSampleDataTEI = $scope.eventList[i].dataValues[j].value;
                            }
                            if( $scope.eventList[i].dataValues[j].dataElement === 'l9NuW9KD5mU' ){
                                $scope.organismDataTEI = $scope.eventList[i].dataValues[j].value;
                            }
                            // collect coc for antibiotic test result value
                            if( $scope.eventList[i].dataValues[j].value === 'Resistant'
                                || $scope.eventList[i].dataValues[j].value === 'Intermediate'
                                || $scope.eventList[i].dataValues[j].value === 'Susceptible'){

                                let tempArray = [$scope.dataElementObjects[$scope.eventList[i].dataValues[j].dataElement].code, $scope.eventList[i].dataValues[j].value]
                                tempArray = tempArray.sort();
                                $scope.categoryOptionCombo = tempArray.join("");
                                $scope.categoryOptionCombo = $scope.tempCategoryCombos[ANTIBIOTIC_CATEGORY_COMBO_CODE].categoryOptionCombos[$scope.categoryOptionCombo]
                                $scope.antibioticCategoryOptionComboUIDsTEI.push($scope.categoryOptionCombo)
                            }
                        }

                        if( ($scope.locationDataTEI && $scope.sampleTypeDataTEI && $scope.departmentDataTEI
                            && $scope.purposeOfSampleDataTEI && $scope.organismDataTEI && $scope.organismDataTEI !== 'NO GROWTH' ) ){
                            $scope.tempCategoryOptions = $scope.tempCategoryCombos[SAMPLE_LOCATION_DEPT_CODE].categoryOptions[$scope.locationDataTEI];
                            $scope.tempCategoryOptions = $scope.tempCategoryOptions + ";" + $scope.tempCategoryCombos[SAMPLE_LOCATION_DEPT_CODE].categoryOptions[$scope.sampleTypeDataTEI];
                            $scope.tempCategoryOptions = $scope.tempCategoryOptions + ";" + $scope.tempCategoryCombos[SAMPLE_LOCATION_DEPT_CODE].categoryOptions[$scope.departmentDataTEI];
                            $scope.tempCategoryOptions = $scope.tempCategoryOptions + ";" + $scope.tempCategoryCombos[SAMPLE_LOCATION_DEPT_CODE].categoryOptions[$scope.purposeOfSampleDataTEI];
                            $scope.tempAggregateDE = $scope.dataElementObjects[$scope.organismDataTEI].id;
                            //let deAntibioticWise = dataElementObjects[organismData + '_AW'].id;

                            let defaultValue = 0;

                            MetadataService.getAggregatedDataValue( $scope.isoPeriod,$scope.defaultDataSet,$scope.tempAggregateDE,$scope.aggregateorgUnit,$scope.cCombo,$scope.tempCategoryOptions,$scope.coDefault )
                                .then(function(aggregatedDataValueGetResponse){

                                    if (aggregatedDataValueGetResponse.response) {
                                        //this means that there have been a successfull fetching of data
                                        defaultValue = aggregatedDataValueGetResponse.value;
                                        MetadataService.postAggregatedDataValue(  $scope.isoPeriod, $scope.defaultDataSet, $scope.tempAggregateDE, $scope.aggregateorgUnit, $scope.cCombo, $scope.tempCategoryOptions, $scope.coDefault, defaultValue )
                                            .then(function(aggregatedDataValuePostResponse){
                                                console.log( aggregatedDataValuePostResponse );
                                                //if(aggregatedDataValuePostResponse.data.status === "OK"){
                                                MetadataService.updateEventStatus( $scope.tempEventForUpdate ).then(function(eventUpdateResponse){
                                                    console.log( eventUpdateResponse );
                                                });
                                                //}
                                            });
                                    }
                            });

                            // push antibiotic test result value to aggregated DataValue
                            if( $scope.organismDataTEI !== 'STERILE'){
                                $scope.deAntibioticWise = $scope.dataElementObjects[$scope.organismDataTEI + '_AW'].id;
                                for (let index in $scope.antibioticCategoryOptionComboUIDsTEI) {
                                    $scope.antiCategoryOptionCombo = $scope.antibioticCategoryOptionComboUIDsTEI[index];

                                    MetadataService.getAggregatedDataValue( $scope.isoPeriod,$scope.antibioticWiseDataSet,$scope.deAntibioticWise,$scope.aggregateorgUnit,$scope.cCombo, $scope.tempCategoryOptions, $scope.antiCategoryOptionCombo)
                                        .then(function(aggregatedDataValueGetResponse){

                                            if (aggregatedDataValueGetResponse.response) { //this means that there have been a successfull fetching of data
                                                defaultValue = aggregatedDataValueGetResponse.value;

                                                MetadataService.postAggregatedDataValue(  $scope.isoPeriod, $scope.antibioticWiseDataSet, $scope.deAntibioticWise, $scope.aggregateorgUnit, $scope.cCombo, $scope.tempCategoryOptions, $scope.antiCategoryOptionCombo, defaultValue )
                                                    .then(function(aggregatedDataValuePostResponse){
                                                        console.log( aggregatedDataValuePostResponse.data.message);
                                                        if(aggregatedDataValuePostResponse.data.status === "OK"){
                                                            MetadataService.updateEventStatus( $scope.tempEventForUpdate ).then(function(eventUpdateResponse){
                                                                console.log( eventUpdateResponse );
                                                            });
                                                        }
                                                    });
                                            }
                                    });

                                }
                            }
                        }

                    }
                })

            })

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
