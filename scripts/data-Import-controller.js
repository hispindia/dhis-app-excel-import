/**
 * Created by Wasib on 26/02/18.
 */
dataImportApp.directive('calendar', function () {
  return {
    require: 'ngModel',
    link: function (scope, el, attr, ngModel) {
      $(el).datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect: function (dateText) {
          scope.$apply(function () {
            ngModel.$setViewValue(dateText);
          });
        }
      });
    }
  };
});


dataImportApp.controller('DataImportController', function ($rootScope, $scope, $http, $timeout, MetadataService) {

  $http.get("./mapping/SC_mapping.json").success(function (response) {
    $scope.SCsheetDeJson = response;
  });

  $http.get("./mapping/PHC_mapping.json").success(function (response) {
    $scope.PHCsheetDeJson = response;
  });

  $scope.orgUnitGroupSets = function (selectedDistrict) {
    // var url2 = "../../dataSets.json?fields=id,name,code,periodType&paging=false";
    var url2 = "../../organisationUnitGroupSets.json?fields=id,name,code,organisationUnitGroups[id,name,code]&paging=false"
    $.get(url2, function (data2) {
      $scope.groupSets = [];
      for (var a = 0; a < data2.organisationUnitGroupSets.length; a++) {
        for (var b = 0; b < data2.organisationUnitGroupSets[a].organisationUnitGroups.length; b++) {
          $scope.groupSets.push(data2.organisationUnitGroupSets[a].organisationUnitGroups[b]);
        }
      }
    });

    $scope.loadDataSets($scope.selectedOrgUnit.id);
  }

  $scope.loadDataSets = function (selectedDistrict) {

    var url2 = "../../dataSets.json?fields=id,name,code,periodType&paging=false";
    $.get(url2, function (data2) {
      $scope.dataSets = [];

      for (var b = 0; b < data2.dataSets.length; b++) {
        //   if (data2.dataSets[b].id === "mwm9DF8OumI") {
        $scope.dataSets.push(data2.dataSets[b]);
        //    }
      }
      $('#loader').hide();
    });

    /*$scope.basicUrl = "../../sqlViews/";
    $scope.level6SQLid = 'oqBv1SqYitb';

    var url3 = $scope.basicUrl + $scope.level6SQLid + "/data.json?";
    url3 += "var=districtUid:" + selectedDistrict;

    $.get(url3, function (data3) {
        $scope.phcOrgUnits = [];
        $scope.tempAllOrgUnitList = data3;
        for (var i in $scope.tempAllOrgUnitList.rows) {
            $scope.phcOrgUnits.push($scope.tempAllOrgUnitList.rows[i]);
        }
        //   console.log($scope.phcOrgUnits);
    });*/

  }


  $scope.getAllPrograms = function (selectedProgram) {

    if (selectedProgram != undefined || selectedProgram != null) {
      $scope.filteredOrgUnitList = [];
      $scope.DataSet = selectedProgram.id;
      //  var url4 = '../../dataSets.json?filter=id:eq:' + $scope.DataSet + "&fields=id,name,periodType,organisationUnits[id,name,code,attributeValues[attribute[id,name,code],value]&paging=false";
      var url4 = "../../organisationUnitGroups/" + $scope.selectedGroupSet + ".json?fields=id,name,code,organisationUnits[id,name,code,attributeValues[attribute[id,name,code],value]&paging=false";
      $.get(url4, function (data4) {
        $scope.dataSetOrgUnit = data4.organisationUnits;

        var url1 = "../../organisationUnits/" + $scope.selectedOrgUnitUid + ".json?includeDescendants=true&fields=id,name&paging=false";
        $.get(url1, function (data1) {
          $scope.allOrgUnit = data1.organisationUnits;

          angular.forEach($scope.dataSetOrgUnit, function (setOrgUnit) {
            angular.forEach($scope.allOrgUnit, function (all_OrgUnit) {
              if (setOrgUnit.id === all_OrgUnit.id) {
                $scope.filteredOrgUnitList.push(setOrgUnit);
              }
            });
          });
        });
      });
    }
    console.log($scope.filteredOrgUnitList);
    generatePeriods($scope.DataSet);
  }


  $scope.checkFile = function (selectedDataSet, selectedPeriod, selectedSheetType) {
    if (selectedPeriod == undefined) {
      alert("Please select the mandatory fields");
    }
    else if (selectedSheetType == undefined) {
      alert("Please select the mandatory fields");
    }
    else {

      var file = document.getElementById('fileInput').files[0];

      if (!file) {
        alert("Error Cannot find the file!");
        return;
      }

      switch (file.type) {
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        case "application/vnd.ms-excel":
          $timeout(function () {
            $('#loader').show();
            parseExcel(file)
          }, 1000);
          break
        default: alert("Unsupported Format");
          break
      }
    }
  }


  function parseExcel(file) {
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function (e) {
      var data = e.target.result;
      var wb = XLSX.read(data, { type: 'binary' });
      var sheetName = wb.SheetNames[0];
      var mySheet = wb.Sheets[sheetName];
      var data_sheet = XLSX.utils.sheet_to_json(mySheet, { range: 4 });
      console.log(data_sheet);
      var headersMapGrpByDomain = sheet2arr(data_sheet);
    }
  }

  $scope.getPeriod = function (selectedPeriod) {
    $scope.selectedPeriod = selectedPeriod;
  }

  $scope.getSheetType = function (selectedSheetType) {
    $scope.selectedSheetTypeName = selectedSheetType.name;
    $scope.selectedGroupSet = selectedSheetType.id;
  }

  var sheet2arr = function (sheet) {
    $('#response').empty();
    $('#result').empty();

    var finalOu = [];
    if ($scope.filteredOrgUnitList.length > 0) {
      for (var i = 0; i < $scope.filteredOrgUnitList.length; i++) {
        if ($scope.filteredOrgUnitList[i].attributeValues.length != 0) {
          finalOu.push({ 'id': $scope.filteredOrgUnitList[i].id, 'value': $scope.filteredOrgUnitList[i].attributeValues[0].value })
        }
      }
    }
    console.log(finalOu);

    if ($scope.selectedSheetTypeName == "SC Group") {
      var DEsheet = $scope.SCsheetDeJson;
    }
    else if ($scope.selectedSheetTypeName == "PHC Group") {
      var DEsheet = $scope.PHCsheetDeJson;
    }
    else {
      alert("Selected Group set does not exist!");
      $timeout(function () {
        $('#loader').hide();
      });
    }

    var result = [];
    var resultOu = [];
    for (var i = 0; i < finalOu.length; i++) {
      for (var j = 0; j < DEsheet.length; j++) {
        for (var obj in sheet) {
          if (sheet.hasOwnProperty(obj)) {
            for (var prop in sheet[obj]) {
              if (sheet[obj].hasOwnProperty(prop)) {
                if (obj == j) {
                  if (prop == finalOu[i].value) {
                   // if (sheet[obj]['name'] == DEsheet[j].name) {
                   //   if (sheet[obj]['categorycombo_name'] == DEsheet[j].categorycombo_name) {
                        var value = sheet[obj][finalOu[i].value];
                        if (DEsheet[j].type == "date") {
                          var value = myFunction(value);
                        }
                        if (value != null || value != undefined || value != "") {
                          result.push({ 's.no': DEsheet[j].s_no, 'ou': prop, 'ouId': finalOu[i].id, 'dataElement': DEsheet[j].name, 'catComId': DEsheet[j].categorycombo, 'deId': DEsheet[j].id, 'value': value });
                          resultOu.push(finalOu[i].id);
                        }
                      }
                    }
                }
              }
            }
          }
        }
      }
      console.log(result);
      var filteredResultou = resultOu.filter(function (item, pos) {
        return resultOu.indexOf(item) == pos;
      });
      pushDataSetVal(result, filteredResultou);
    };

    var myFunction = function (date) {
      // var str = "2122017"
      if (date.length == 8) {
        var year = date.substring(8, 4);
        var month = date.substring(4, 2);
        var day = date.substring(2, 0);

        date = year + "-" + month + "-" + day;
      }
      else if (date.length == 7) {
        var year = date.substring(7, 3);
        var month = date.substring(3, 1);
        var day = date.substring(1, 0);
        if (day < 10) {
          day = "0" + day;
        }
        date = year + "-" + month + "-" + day;
      }
      return date;
    }

    var pushDataSetVal = function (result, filteredResultou) {

      if (result.length != 0) {

        var dataValueSet = {
          "dataSet": $scope.DataSet,
          "period": $scope.selectedPeriod,
          "dataValues": []
        };

        for (var z in result) {
          dataValueSet.dataValues.push({
            orgUnit: result[z].ouId,
            categoryOptionCombo: result[z].catComId,
            period: $scope.selectedPeriod,
            dataElement: result[z].deId,
            value: result[z].value
          })
        }

        $.ajax({
          async: false,
          type: 'post',
          dataType: 'json',
          contentType: "application/json",
          url: '../../dataValueSets',
          data: JSON.stringify(dataValueSet),
          success: function (response) {
            dataSetComplete(filteredResultou);
            var text = "Data imported successfully!";
            $('#result').append(text);
            $('#response').append(JSON.stringify(response.importCount));
          },
          warning: function (response) {
            $timeout(function () {
              $('#loader').hide();
            });
            alert("There is a Warning!");
            $('#response').append(JSON.stringify(response.importCount));
          },
          error: function (response) {
            $timeout(function () {
              $('#loader').hide();
            });
            alert("Data imported failed!");
            $('#response').append(JSON.stringify(response.importCount));
          }
        });

      }
      else {
        $timeout(function () {
          $('#loader').hide();
        });
        alert("No data to import!");
      }
    }

    var dataSetComplete = function (filteredResultou) {

      for (var z in filteredResultou) {

        var dataSetCompleteParams = {
          "ds": $scope.DataSet,
          "pe": $scope.selectedPeriod,
          "ou": filteredResultou[z],
          "multiOu": false
        };

        $.ajax({
          async: false,
          type: 'post',
          dataType: 'json',
          url: '../../25/completeDataSetRegistrations',
          data: dataSetCompleteParams,
          success: function (response) {
            $timeout(function () {
              $('#loader').hide();
            });
            $("#result1").html("Registration Completed!");
            console.log("Registration Completed!");
          },
          error: function (response) {
            $timeout(function () {
              $('#loader').hide();
            });
            $("#result1").html("Registration Ignored!");
            console.log("Registration Ignored!");
          }
        });

      }

    }

    jQuery(document).ready(function () {
      hideLoad();
    })
    $timeout(function () {
      $scope.date = {};
      $scope.date.startDate = new Date();
      $scope.date.endDate = new Date();
    }, 0);

    //initially load tree
    selection.load();

    // Listen for OU changes
    selection.setListenerFunction(function () {
      //getAllPrograms();
      $scope.selectedOrgUnitUid = selection.getSelected();
      loadPrograms();

    }, false);

    loadPrograms = function () {
      MetadataService.getOrgUnit($scope.selectedOrgUnitUid).then(function (orgUnit) {
        $timeout(function () {
          $scope.selectedOrgUnit = orgUnit;
          $scope.orgUnitGroupSets();
          $scope.programs = [];
          for (var i = 0; i < orgUnit.dataSets.length; i++) {
            $scope.programs.push(orgUnit.dataSets[i]);
          }
        });
      });

      //  generateDataElements();
    }

    /* generateDataElements = function () {
     //$scope.dataSetId = 'mwm9DF8OumI';
         var url4 = '../../dataSets/' + $scope.dataSets + ".json?fields=dataSetElements[dataElement[id,name,code]]";
                 $.get(url4, function (data4) {
                     $scope.tempAllDataElements = data4.dataSetElements;
     
                     $scope.dataElements = [];
     
                     for (var i in $scope.tempAllDataElements) {
                         $scope.dataElements.push($scope.tempAllDataElements[i].dataElement);
                     }
                 });
         generatePeriods($scope.dataSetId);
         }*/

    generatePeriods = function (DataSet) {

      if (DataSet != "") {
        $.getJSON("../../dataSets/" + DataSet + ".json?fields=periodType", function (d) {
          var periodType = d.periodType;
          var today = new Date();
          var lastyear = today.getFullYear() - 1;
          var stDate = "01/01/" + lastyear;
          var latestMonth1 = today.getMonth() + 1;
          if (latestMonth1 < 10) {
            latestMonth = "0" + latestMonth1;
          }
          else {
            latestMonth = latestMonth1;
          }
          var endDate = latestMonth + "/01/" + (today.getFullYear());
          var periods = "";

          if (periodType == "Daily")
            periods = daily(stDate, endDate);
          else if (periodType == "Weekly")
            periods = weeklynew(stDate, endDate);
          else if (periodType == "Monthly")
            periods = monthly(stDate, endDate);
          else if (periodType == "Yearly")
            periods = yearly(stDate, endDate);
          else if (periodType == "Quarterly")
            periods = quartly();
          else if (periodType == "SixMonthly")
            periods = SixMnthly();
          else if (periodType == "SixMonthlyApril")
            periods = SixMnthlyApril();


          $("#importPeriod").html("");
          periods.split(";").forEach(function (p) {

            if (periodType == 'Monthly') {
              var ps = $scope.monthString(p);
              var h1 = "<option value='" + p + "'>" + ps + "</option>";
              $("#importPeriod").append(h1);
            }
            else if (periodType == "Quarterly") {
              var ps1 = $scope.quater(p);
              var h2 = "<option value='" + p + "'>" + ps1 + "</option>";
              $("#importPeriod").append(h2);
            }
            else if (periodType == "SixMonthly") {
              var ps2 = $scope.SixMonthly(p);
              var h4 = "<option value='" + p + "'>" + ps2 + "</option>";
              $("#importPeriod").append(h4);
            }
            else if (periodType == "SixMonthlyApril") {
              var ps2 = $scope.SixMonthlyApril(p);
              var h4 = "<option value='" + p + "'>" + ps2 + "</option>";
              $("#importPeriod").append(h4);
            }
            else if (periodType == "Daily") {
              var ps2 = $scope.daily(p);
              var h4 = "<option value='" + p + "'>" + ps2 + "</option>";
              $("#importPeriod").append(h4);
            }
            else if (periodType == "Weekly") {
              var ps2 = $scope.weekly(p);
              var h4 = "<option value='" + p + "'>" + ps2 + "</option>";
              $("#importPeriod").append(h4);
            }
            else {
              var h3 = "<option value='" + p + "'>" + p + "</option>";
              $("#importPeriod").append(h3);
            }
          });
        });
      }
    };
    $scope.weekly = function (period) {
      var newp;
      if (period == "Select Period") {
        newp = "Select Period";
      }
      else {

        var week = period.substring(4, 7);
        var prd = period.substring(0, 4);

        if (week == "W1" || week == "W2" || week == "W3" || week == "W4" || week == "W5") {
          newp = week + "-" + "January" + " " + prd;
        }
        else if (week == "W6" || week == "W7" || week == "W8" || week == "W9") {
          newp = week + "-" + "February" + " " + prd;
        }
        else if (week == "W10" || week == "W11" || week == "W12" || week == "W13" || week == "W14") {
          newp = week + "-" + "March" + " " + prd;
        }
        else if (week == "W15" || week == "W16" || week == "W17" || week == "W18") {
          newp = week + "-" + "April" + " " + prd;
        }
        else if (week == "W19" || week == "W20" || week == "W21" || week == "W22") {
          newp = week + "-" + "May" + " " + prd;
        }
        else if (week == "W23" || week == "W24" || week == "W25" || week == "W26" || week == "W27") {
          newp = week + "-" + "June" + " " + prd;
        }
        else if (week == "W28" || week == "W29" || week == "W30" || week == "W31") {
          newp = week + "-" + "July" + " " + prd;
        }
        else if (week == "W32" || week == "W33" || week == "W34" || week == "W35") {
          newp = week + "-" + "August" + " " + prd;
        }
        else if (week == "W36" || week == "W37" || week == "W38" || week == "W39" || week == "W40") {
          newp = week + "-" + "September" + " " + prd;
        }
        else if (week == "W41" || week == "W42" || week == "W43" || week == "W44") {
          newp = week + "-" + "October" + " " + prd;
        }
        else if (week == "W45" || week == "W46" || week == "W47" || week == "W48") {
          newp = week + "-" + "November" + " " + prd;
        }
        else if (week == "W49" || week == "W50" || week == "W51" || week == "W52" || week == "W53") {
          newp = week + "-" + "December" + " " + prd;
        }

      }
      return newp;
    }
    $scope.daily = function (period) {
      var newp;
      if (period == "Select Period") {
        newp = "Select Period";
      } else {
        var d1 = period.substring(0, 4);
        var d2 = period.substring(4, 6);
        var d3 = period.substring(6, 8);

        newp = d3 + "-" + d3 + "-" + d1;
      }
      return newp;
    }

    $scope.SixMonthlyApril = function (period) {
      var ms = [], ms1 = [], ms2 = [], newp;
      if (period == "Select Period") {
        newp = "Select Period";
      } else {
        var month = period.substring(4, 11);

        if (month == "AprilS1") {
          ms = "April - September ";
          newp = ms + " " + period.substring(0, 4);
        }
        else if (month == "AprilS2") {
          ms2 = "October ";
          ms1 = " - March ";
          var m = parseInt(period.substring(0, 4)) + 1;
          newp = ms2 + " " + (period.substring(0, 4)) + ms1 + " " + m;
        }

      }
      return newp;
    }

    $scope.SixMonthly = function (period) {
      var ms = [], newp;
      if (period == "Select Period") {
        newp = "Select Period";
      } else {
        var month = period.substring(4, 6);

        if (month == "S1")
          ms = "January - June";
        else if (month == "S2")
          ms = "July - December";
        newp = ms + " " + period.substring(0, 4);
      }
      return newp;
    }
    $scope.quater = function (period) {
      var ms = [], newp;
      if (period == "Select Period") {
        newp = "Select Period";
      }
      else {
        var month = period.substring(4, 6);

        if (month == "Q1")
          ms = "January - March";
        else if (month == "Q2")
          ms = "April - June ";
        else if (month == "Q3")
          ms = "July - September ";
        else if (month == "Q4")
          ms = "October - December";

        newp = ms + " " + period.substring(0, 4);
      }
      return newp;

    };

    $scope.monthString = function (pst) {
      var newp;
      if (pst == "Select Period") {
        newp = "Select Period";

      }
      else {
        var month = pst.substring(4, 6);
        var ms = [];

        if (month == "01")
          ms = "Jan";
        else if (month == "02")
          ms = "Feb";
        else if (month == "03")
          ms = "Mar";
        else if (month == "04")
          ms = "Apr";
        else if (month == "05")
          ms = "May";
        else if (month == "06")
          ms = "Jun";
        else if (month == "07")
          ms = "Jul";
        else if (month == "08")
          ms = "Aug";
        else if (month == "09")
          ms = "Sep";
        else if (month == "10")
          ms = "Oct";
        else if (month == "11")
          ms = "Nov";
        else if (month == "12")
          ms = "Dec";

        newp = ms + " " + pst.substring(0, 4);
      }
      return newp;
    };

    $.ajaxSetup({
      async: false
    });

    /** $scope.printcontent=function(){
    
    window.print();
    
    };**/
    // $scope.ExportToExcel = function (mydata) {
    //     var htmltable = document.getElementById('tabledata');
    //     var html = htmltable.outerHTML;
    //     window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));

    // }

    // $scope.printDiv = function (div) {
    //     var docHead = document.head.outerHTML;
    //     var printContents = document.getElementById("tabledata").outerHTML;
    //     var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no,alig toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";

    //     var newWin = window.open("", "_blank", winAttr);
    //     var writeDoc = newWin.document;
    //     writeDoc.open();
    //     writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print()"><div style="margin-top:-250px">' + printContents + '</div></body></html>');
    //     writeDoc.close();
    //     newWin.focus();
    // }

    function showLoad() {
      setTimeout(function () {

      }, 1000);
    }
    function hideLoad() {
    }

  });
