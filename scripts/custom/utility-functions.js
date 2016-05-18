/**
 * Created by harsh on 7/5/16.
 */


prepareIdToObjectMap = function(object,id){
    var map = [];
    for (var i=0;i<object.length;i++){
        map[object[i][id]] = object[i];
    }
    return map;
}

prepareMapGroupedById= function(object,id){
    var map = [];
    for (var i=0;i<object.length;i++){
        if (!map[object[i][id]]){
            map[object[i][id]] = [];
        }
        map[object[i][id]].push(object[i]);
    }
    return map;
}

prepareListFromMap= function(map){
    var list = [];
    for (var key in map){
        list.push(map[key]);
    }
    return list;
}

function getConflicts(response){

    if (response.responseText){
        var jsonRT = JSON.parse(response.responseText);
        if (jsonRT.response.conflicts){
            return jsonRT.response.conflicts;
        }
        if (jsonRT.response.importSummaries[0].conflicts){
            return jsonRT.response.importSummaries[0].conflicts;
        }
        if (jsonRT.response.importSummaries[0].status == "ERROR"){
            return ([{object:jsonRT.response.importSummaries[0].description,value:""}]);
        }
    }else{
        if (response.httpStatus.response){
            if (response.httpStatus.response.conflicts){
                return response.httpStatus.response.conflicts;
            }
        }
    }

    return false;
}

function findReference(response){

    if (response.response){

        if (response.response && response.response.reference){
            return response.response.reference;
        }

        if (response.response.importSummaries ){
            if (response.response.importSummaries[0].reference)
                return response.response.importSummaries[0].reference;
        }
    }
return "";
}