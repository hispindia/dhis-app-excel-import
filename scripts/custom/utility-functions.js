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