/**
 * Created by harsh on 15/12/16.
 */


import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import XLSX from 'xlsx';
import * as CONSTANTS from './#/constants';
import tagParser from './#/tag-parser';
import {importHandler} from './#/import-handler';
import {UploadFile} from './components/components';
import {ImportSummaryTable} from './components/components';
import {RequestStats} from './components/components';

import {trackerDataHandler} from './#/trackerdata-handler';

var utility = require('./utility-functions');
import dhis2API from './dhis2API/dhis2API';

var api = new dhis2API();

var importSummary = {};
var importSummaryList = [];
var requestStats = {
    requestCount : 0,
    successCount : 0,
    errorCount : 0
};


$('document').ready(function(){

    ReactDOM.render(<UploadFile onClick={uploadFileHandler}/>, document.getElementById('container'));

});

function uploadFileHandler(){

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
            break;
        case "" :
            if (file.name.split(".")[1] == "json"){
                parseJson(file);
            }
            
            break;
        default : alert("Unsupported Format");
            break
    }
}

function parseJson(file){
    var reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = function(e) {
        var data = JSON.parse(e.target.result);

        trackerDataHandler(data,notificationCallback);
    }
}

function parseCSV(file){
    debugger
}

function parseExcel(file){
    var reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = function(e) {
        var data = e.target.result;
        var wb = XLSX.read(data, {type: 'binary'});

        var data_sheet = XLSX.utils.sheet_to_json(wb.Sheets[CONSTANTS.DATA_SHEETNAME]);
        var metadata_sheet = XLSX.utils.sheet_to_json(wb.Sheets[CONSTANTS.METADATA_SHEETNAME]);
        var parser = new tagParser();

        var parsed = parser.parseList(get_header_row(wb.Sheets[CONSTANTS.DATA_SHEETNAME]));

        importHandler(parsed,data_sheet,notificationCallback);

    };

    function get_header_row(sheet) {
        //https://github.com/SheetJS/js-xlsx/issues/214
        //https://github.com/SheetJSDev
        var headers = [];
        var range = XLSX.utils.decode_range(sheet['!ref']);
        var C, R = range.s.r; /* start in the first row */
        /* walk every column in the range */
        for(C = range.s.c; C <= range.e.c; ++C) {
            var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */

            var hdr = "UNKNOWN " + C; // <-- replace with your desired default
            if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);

            headers.push(hdr);
        }
        return headers;
    }
}

function notificationCallback(error,response,header,index){

    var importStat = {};

    var summaryItem = {};
    summaryItem.domain_key = header.domain_key;
    console.log(response.status );
    var conflicts = api.getConflicts(response);
    var reference = api.findReference(response);
    summaryItem.reference = reference;
    summaryItem.conflicts = conflicts;

    if (response.status == "OK") {
        summaryItem.httpResponse = response;
        requestStats.successCount = requestStats.successCount + 1;
    }else{
        if (response.responseText){
            if (utility.isJson(response.responseText)){
                summaryItem.httpResponse = JSON.parse(response.responseText);
                requestStats.errorCount = requestStats.errorCount+1;
            }
        }
    }

    summaryItem.status = api.findStatus(response);
    summaryItem.row = index;

    /* case for datavalue sets */
    if (response.dataSetComplete){
        if (response.conflicts){
            summaryItem.status = "Conflict";
            requestStats.errorCount = requestStats.errorCount+1;
        }else{
            summaryItem.httpResponse = response;
            requestStats.successCount = requestStats.successCount + 1;
        }
    }

    if (!importSummary[index]){
        importSummary[index] = [];
        importSummaryList.push(importSummary[index]);
        // importSummaryMap[importStat.index] = importSummary[importStat.index];
        importSummary[index].push(summaryItem);
    }else{
        importSummary[index].push(summaryItem);
    }

    requestStats.requestCount = requestStats.requestCount+1;

    ReactDOM.render(<ImportSummaryTable data={importSummaryList}/>, document.getElementById('dataTable'));
    ReactDOM.render(<RequestStats data={requestStats}/>, document.getElementById('requestStats'));

}
