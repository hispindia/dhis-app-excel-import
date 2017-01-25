/**
 * Created by harsh on 21/12/16.
 */

import React,{propTypes} from 'react';
import _ from 'lodash';

export function UploadFile(props){
        return (
                <div>
                    <label>Upload .json file</label>
                    <input type="file" id="fileInput"/>
                    <button onClick={props.onClick}>Import</button>
                </div>
            )
}

export function RequestStats(props){

var requestStats = props.data;
    return (
            <ul>
                <li>No of Requests made : {requestStats.requestCount}</li>
                <li>No of Successful requests : {requestStats.successCount}</li>
                <li>No of Failed requests : {requestStats.errorCount}</li>
            </ul>
    )
}
function SummaryTD(props){

}
function SummaryRow(props){

    function getRows(){
        var rows = [];

        for (var i=0;i<props.data.length;i++){
            rows.push(
                <tr key={_.uniqueId("td_")}>
                    <td key = {_.uniqueId("td_")}>{props.data[i].domain_key}</td>
                    <td key = {_.uniqueId("td_")}>{props.data[i].status}</td>
                    <td key = {_.uniqueId("td_")}>{props.data[i].httpResponse?props.data[i].httpResponse.message:""}</td>
                    <ConflictsTD data={props.data[i].conflicts}></ConflictsTD>
                    <td key = {_.uniqueId("td_")}>{props.data[i].reference}</td>
                </tr>            )
        }
        return rows;
    }
    return(
       <i key = {_.uniqueId("td_")}>{getRows()}</i>
    )
}

function ConflictsTD(props){

    function getConflicts(conflicts){
        var _conflicts = [];

        for (var i=0;i<conflicts.length;i++){
            _conflicts.push(<i key = {_.uniqueId("i_")}>{conflicts[i].object} - {conflicts[i].value}</i>)
        }

        return _conflicts;
    }

return(
    <td key={_.uniqueId("i_")}>{getConflicts((props.data))}</td>
    )
}

function IndexRow(props){

    return(
        <tr key={_.uniqueId("td_")}>
            <td key = {_.uniqueId("td_")} rowSpan={props.data.length+2}>{props.data[0].row+2}</td>
        </tr>
    )
}
export function ImportSummaryTable(props){
    function getTBodies(){
        var tbody = [];
        for (var i=0;i<props.data.length;i++){
                tbody.push(
                        <tbody key = {_.uniqueId("td_")} >
                        <IndexRow key = {_.uniqueId("td_")} data={props.data[i]}></IndexRow>
                        <SummaryRow key = {_.uniqueId("td_")} data={props.data[i]}></SummaryRow>
                        </tbody>
                    )

        }
        return tbody
    }

    return(
    <table className="table-bordered">
        <thead>
        <tr>
            <th>Row</th>
            <th>Domain</th>
            <th>Status</th>
            <th>HTTP Response</th>
            <th>Conflict Details</th>
            <th>Reference</th>
        </tr>
        </thead>

        {getTBodies()}
    </table>
    )
}

