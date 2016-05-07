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