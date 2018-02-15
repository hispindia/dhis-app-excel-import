/**
 * Created by Gourav & Wasib on 05/02/18.
 */
//http://localhost:8080/fpai/api/organisationUnits/gtuFfMKvkn4.json?fields=*,programs[id,name,programType]paging=false
//http://localhost:8080/fpai/api/events.json?orgUnit=gtuFfMKvkn4&program=dWPcV6EiVB1
//http://localhost:8080/fpai/api/audits/trackedEntityDataValue.json?de=APwZh8qlHOU
msfReportsApp.directive('calendar', function () {
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

msfReportsApp.controller('TrackAuditController', function( $rootScope,$scope,$timeout,MetadataService){

// const SQLVIEW_TEI_PS = "nBCleImsp8E";
// const SQLVIEW_TEI_ATTR = "NJKQr9q6kOO";
// const SQLVIEW_TEI_PS =  "EX2dsz6vmES";
// const SQLVIEW_TEI_ATTR = "pUiDfNYflvv";

    const SQLVIEW_TEI_PS =  "FcXYoEGIQIR";
    const SQLVIEW_TEI_ATTR = "WMIMrJEYUxl";
    const SQLVIEW_EVENT = "IQ78273FQtF";

    jQuery(document).ready(function () {
        hideLoad();
    })
    $timeout(function(){
        $scope.date = {};
        $scope.date.startDate = new Date();
        $scope.date.endDate = new Date();
    },0);
--
//initially load tree
    selection.load();

// Listen for OU changes
    selection.setListenerFunction(function(){
//getAllPrograms();
        $scope.selectedOrgUnitUid = selection.getSelected();
        loadPrograms();
    },false);

    loadPrograms = function(){
        MetadataService.getOrgUnit($scope.selectedOrgUnitUid).then(function(orgUnit){
            $timeout(function(){
                $scope.selectedOrgUnit = orgUnit;
                $scope.programs=[];
//console.log(programs.name);
//alert(programs.name);
                for(var i=0;i<orgUnit.programs.length;i++)
                {
                    var prog=orgUnit.programs[i];
                    if(prog.programType=="WITH_REGISTRATION") {
                        $scope.programs.push(prog);
                    }

                }


            });
        });
    };



    /** $scope.update=function(selectedProgram)
     {

     alert(selectedProgram.id);

     }**/

    $scope.getAllPrograms = function(selectedOrgUnit,selectedProgram){
        $scope.prog = selectedProgram.id;
        $scope.orgunit=selectedOrgUnit.id;
        $.getJSON("../../trackedEntityInstances.json?ou="+$scope.orgunit+"&program="+$scope.prog+"", function (data) {

            $scope.entname=[];
            //console.log($scope.entname);
        for(var i=0;i<data.trackedEntityInstances.length;i++)
        {
            for(var j=0;j<data.trackedEntityInstances[i].attributes.length;j++)
            {
                var val=data.trackedEntityInstances[i].attributes[j].displayName;
                var ttt=data.trackedEntityInstances[i];
                if(val=="Name")
                {
                    var name=data.trackedEntityInstances[i].attributes[j];


                    var obj={
                        "trackedEntityInstance":data.trackedEntityInstances[i].trackedEntityInstance,
                        "attribute":data.trackedEntityInstances[i].attributes[j].attribute,
                        "value":data.trackedEntityInstances[i].attributes[j].value,
                        "program":$scope.prog,
                        "orgUnit":$scope.orgunit
                        };
                    $scope.entname.push(obj);
                }
            }
        }


            if($scope.entname.length==0)
            {
                alert("No Track Entity Found");
                document.getElementById("sel1").disabled=true;
                document.getElementById("sel2").disabled=true;

            }
            else
            {
                document.getElementById("sel1").disabled=false;
                document.getElementById("sel2").disabled=false;

            }

  });
 };


    $scope.geteventDate=function (tracked) {
       // http://localhost:8080/dhis2/api/events.json?orgUnit=oN6etUABBaX&program=tITlMGNJTbJ&trackedEntityInstance=W0ljHYYonE4&skipPaging=true
        var orgUnit=tracked.orgUnit;
        var prog=tracked.program;
        var trackInstance=tracked.trackedEntityInstance;
            $.getJSON("../../events.json?orgUnit="+orgUnit+"&program="+prog+"&trackedEntityInstance="+trackInstance+"&skipPaging=true", function (data) {

                $scope.eventdate=[];
              //  console.log( $scope.eventdate);
                for(var i=0;i<data.events.length;i++) {

                    $scope.name=data.events[i].programStage;

                    $.getJSON("../../programStages/"+$scope.name+".json?fields=id,name&paging=FALSE", function (data1) {



                    var obj={
                        "event":data.events[i].event,
                        "eventDate":data.events[i].eventDate,
                        "programStageid":data.events[i].programStage,
                        "programStage":data1.name,
                        "dataValues":data.events[i].dataValues
                    };

                    $scope.eventdate.push(obj);
                    });

                }

                if($scope.eventdate.length==0)
                {
                    alert("No Event Created");
                    //document.getElementById("sel1").disabled=true;
                    document.getElementById("sel2").disabled=true;

                }
                else
                {
                   // document.getElementById("sel1").disabled=false;
                    document.getElementById("sel2").disabled=false;

                }
             });

    };

    getName=function (name) {


       // $.getJSON("../../programs/"+name+".json?fields=id,name",function (data) {

            $scope.name1=data.name;
           // console.log(myname);

            return $scope.name1;




    };





    $.ajaxSetup({
        async:false
    });
    /** $scope.printcontent=function(){

window.print();

};**/
    $scope.ExportToExcel=function(mydata)
    {
        var htmltable= document.getElementById('tabledata');
        var html = htmltable.outerHTML;
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));

    }

    $scope.printDiv = function (div) {
        var docHead = document.head.outerHTML;
        var printContents = document.getElementById("tabledata").outerHTML;
        var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no,alig toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";

        var newWin = window.open("", "_blank", winAttr);
        var writeDoc = newWin.document;
        writeDoc.open();
        writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print()"><div style="margin-top:-250px">' + printContents + '</div></body></html>');
        writeDoc.close();
        newWin.focus();
    };

    $.ajaxSetup({
        async:false
    });




    $scope.generateReport=function(orgUnit,prog,entity,event) {

        var orgUnit1 = orgUnit.id;
        var progm = event.dataset.dataValues;




         var dataelemntnew=[];
         var m=progm.length;
         if(m==0)
         {
             var row2 = $(
                 "<tr style='text-align: left;' ><td colspan='1' style='font-size: 20px;background-color: white; height:100px ;color: black;font-weight: bold '>No Data Found</td></tr>");
             $("#reporttable").append(row2);

         }else {

            gettackaudit(orgUnit,prog,entity,event);
        }
    };


    gettackaudit=function (orgUnit,prog,entity,event1) {
        var newdata = [];
       // console.log(newdata);
        var devent=event1.dataset.event;
        var evnt=event1.dataset.dataValues;
        for(var t=0;t<evnt.length;t++)
        {
            var dataelemnt=event1.dataset.dataValues[t].dataElement;
        $.getJSON("../../audits/trackedEntityDataValue.json?de="+dataelemnt+"&skipPaging=true", function (data) {

            //console.log(newdata);
            for (var i = 0; i < data.trackedEntityDataValueAudits.length; i++) {
                var newevnt = data.trackedEntityDataValueAudits[i].programStageInstance.id;
                if (newevnt == devent) {
                    newdata.push(data.trackedEntityDataValueAudits[i]);

                }
            }
        });
        }
        if(newdata.length==0)
        {
            var row2 = $(
                "<tr style='text-align: left;' ><td colspan='1' style='font-size: 20px;background-color: white; height:100px ;color: black;font-weight: bold '>No Data Found</td></tr>");
            $("#reporttable").append(row2);

        }
        else {
            //console.log(newdata.length);
            var rowm = $(
                "<thead><tr style='border:1px solid black'><td COLSPAN='2' style='background-color: #8fadc1;height:30px  ;color: #1B4F72;text-align: left; '><font style='font-size: 15px'>Event Date:</font> " +event1.dataset.eventDate.substring(0,10)  + "</td>" +
                "<td COLSPAN='1' style='background-color: #8fadc1;height:30px ;color: #1B4F72;text-align: left; '><font style='font-size: 15px'>Data Set :</font>" + prog.dataset.name + "</td>" +
                "<td COLSPAN='1' style='background-color: #8fadc1;height:30px ;color: #1B4F72;text-align: left; '><font style='font-size: 15px'>Track Entity Name :</font>" +entity.dataset.value  + "</td>" +
                "<td COLSPAN='1' style='background-color: #8fadc1;height:30px  ;color: #1B4F72;text-align: left; '><font style='font-size: 15px'>Org Unit :</font> " + orgUnit.name + "</td></tr>" +
                "<tr><td COLSPAN='5' style='border:1px solid black;background-color: #1B4F72;height:30px  ;color: white;text-align: center;font-weight: bold ' >Data Set Audit Report" + "</td></tr>" +
                "<tr ><th colspan='1' style='border:1px solid black;background-color: #aeb0b0;height:30px   ;color: white;text-align: center;font-weight: bold;position: relative;' >Updated" + "&nbsp;&nbsp;&nbsp;<span style='color: #1B4F72;margin-top: -15px;text-align: right;text-decoration: none;font-weight: normal;'> &#8693;</span></th>" +
                "<th colspan='1' style='border:1px solid black;background-color: #aeb0b0;height:30px   ;color: white;text-align: center;font-weight: bold ' >Modified By" + "&nbsp;&nbsp;&nbsp;<span  style='color: #1B4F72;margin-top: -15px;text-align:right;text-decoration: none;font-weight: normal;'> &#8693;</span></th>" +
                "<th colspan='1' style='border:1px solid black;background-color: #aeb0b0;height:30px   ;color: white;text-align: center;font-weight: bold ' >Audit Type" + "&nbsp;&nbsp;&nbsp;<span style='color:  #1B4F72;margin-top: -15px;text-align:right ;text-decoration: none;font-weight: normal;'> &#8693;</span></th>" +
                "<th colspan='1' style='border:1px solid black;background-color: #aeb0b0;height:30px   ;color: white;text-align: center;font-weight: bold ' >Value" + "&nbsp;&nbsp;&nbsp;<span style='color:  #1B4F72;margin-top: -15px;text-align:right;text-decoration: none;font-weight: normal;'> &#8693;</span></th>" +
                "<th colspan='1' style='border:1px solid black;background-color: #aeb0b0;height:30px   ;color: white;text-align: center;font-weight: bold ' >Data Element" + "&nbsp;&nbsp;&nbsp;<span style='color:  #1B4F72;margin-top: -15px;text-align:right;text-decoration: none;font-weight: normal;'> &#8693;</span></th>" +
                "</tr></thead>"
            );
            $("#reporttable").append(rowm);

            var rown = $(
                "<tbody>");
            $("#reporttable").append(rown);


            for (var j = 0; j < newdata.length; j++) {
                var elemntname = newdata[j].dataElement.id;
                var Delemnt = getDataElement(elemntname);

                var rowf = $(
                    "<tr><td  style='border:1px solid black;'> " + newdata[j].created +//
                    "</td><td  style='border:1px solid black;'> " + newdata[j].modifiedBy +//
                    "</td><td  style='border:1px solid black;'>" + newdata[j].auditType +//////
                    "</td><td  style='border:1px solid black;'>" + newdata[j].value +
                    "</td><td  style='border:1px solid black;'>" + Delemnt +
                    "</td></tr>");
                $("#reporttable").append(rowf);


            }
        }
        var rown1 = $(
            "</tbody>");
        $("#reporttable").append(rown1);
        $(document).ready(function()
            {
                $(".tablesorter").tablesorter();
            }
        );




        };

    /**  var rowf = $(
     "<tr><td  style='border:1px solid black;'> " +data.trackedEntityDataValueAudits[i].created +//
     "</td><td  style='border:1px solid black;'> " + data.trackedEntityDataValueAudits[i].modifiedBy +//
     "</td><td  style='border:1px solid black;'>" + data.trackedEntityDataValueAudits[i].auditType +//////
     "</td><td  style='border:1px solid black;'>" + data.trackedEntityDataValueAudits[i].value +
     "</td><td  style='border:1px solid black;'>" + Delemnt +
     "</td></tr></tbody>");
     $("#reporttable").append(rowf);**/
    getDataElement=function (value) {

        var matched = [];
        //console.log(matched);
        $.getJSON("../../dataElements/"+value+".json?fields=name,id&paging=false", function (d) {
            var daelemt=d.name;
           // matched.push(daelemt);

            // val=data.name;
            //return val1;
               var res = daelemt.substring(0,8);

                if(res=="FS_INSP_")
                {
                    var m=daelemt.split("_");
                    matched.push(m[2]);

                }
                else {
                    matched.push(daelemt);

                }





        });
        return matched;


    }






    getcategoryOptionCombo=function (value) {
        var matched = [];
        $.getJSON("../../categoryOptionCombos/"+value+".json?fields=id,name&paging=false", function (d) {
            var daelemt=d.name;
            matched.push(daelemt);
            //console.log(d.name);
            // val=data.name;
            //return val1;




        });
        return matched;


    }



    function showLoad()
    {
// alert( "inside showload method 1" );
        setTimeout(function(){
//  document.getElementById('load').style.visibility="visible";
//   document.getElementById('tableid').style.visibility="hidden";

        },1000);

//     alert( "inside showload method 2" );
    }
    function hideLoad() {
//  document.getElementById('load').style.visibility="hidden";
//  document.getElementById('tableid').style.visibility="visible";
    }

    function arrangeDataX(stageData){

// For Data values
        const index_deuid = 4;
        const index_devalue = 6;
        const index_ps = 0;
        const index_ev = 2;
        const index_evDate = 3;
        const index_ou = 7;

        $scope.eventList = [];
        $scope.eventMap = [];
        $scope.eventDeWiseValueMap = [];

        for (var i=0;i<stageData.height;i++) {

            var psuid = stageData.rows[i][index_ps];
            var evuid = stageData.rows[i][index_ev];
            var evDate = stageData.rows[i][index_evDate];
            var deuid = stageData.rows[i][index_deuid];
            var devalue = stageData.rows[i][index_devalue];
            var ou = stageData.rows[i][index_ou];

            if (!$scope.eventMap[evuid]){
                $scope.eventMap[evuid] = {
                    event : evuid,
                    data : []
                };
                $scope.eventDeWiseValueMap[evuid + "-orgUnit"] = ou;
                $scope.eventDeWiseValueMap[evuid + "-eventDate"] = evDate;



            }

            $scope.eventMap[evuid].data.push( {
                de : deuid,
                value : devalue
            });
            $scope.eventDeWiseValueMap[evuid + "-" + deuid] = devalue;


            for(m in $scope.Options){

                if(devalue+'_index' == m){

                    $scope.eventDeWiseValueMap[evuid + "-" + deuid] = $scope.Options[m];
                }

            }
        }

        $timeout(function(){
            $scope.eventList = prepareListFromMap($scope.eventMap);

        })

    }

});
