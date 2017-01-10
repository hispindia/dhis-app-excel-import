/**
 * Created by harsh on 7/5/16.
 */

var _ = {};

_.prepareIdToObjectMap = function(object,id){
    var map = [];
    for (var i=0;i<object.length;i++){
        map[object[i][id]] = object[i];
    }
    return map;
}

_.prepareMapGroupedById= function(object,id){
    var map = [];
    for (var i=0;i<object.length;i++){
        if (!map[object[i][id]]){
            map[object[i][id]] = [];
        }
        map[object[i][id]].push(object[i]);
    }
    return map;
}


//http://stackoverflow.com/questions/9804777/how-to-test-if-a-string-is-json-or-not
//http://stackoverflow.com/users/3119662/kubosho
_.isJson = function(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}
module.exports = _;