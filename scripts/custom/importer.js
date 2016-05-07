/**
 * Created by harsh on 7/5/16.
 */

function importer(type,data){

    var returnObject = {
        outcome : ""
    }

    var importSummary = [];

    if (data.length == 0){
        returnObject.outcome = "error";
        returnObject.errorMessage = "No Data Present";
    }
    switch(type){
        case TRACKER_REGISTRATION_PLUS_ENROLLMENT :
            return importData(TRACKER_PROGRAM_UID,TRACKER_TRACKED_ENTITY);
            break;
    }

    function importData(){
        var headerData = extractHeaderInformation(data[0]);
            if (headerData.errorMessage){
                return headerData;
            }
        var headerDataMap = prepareIdToObjectMap(headerData,"key");

        for (var i=0;i<data.length;i++){

        }
    }

    function extractHeaderInformation(row1){
        var headerMap = [];
        for (var key in row1){
            var strings = key.split(FIRST_DELIMITER);
            if (strings[1]){
                var typePlusUIDInfo = strings[1].split(SECOND_DELIMITER);
                var item = {    key : key,
                                type : undefined,
                                uid : undefined};

                item.type = typePlusUIDInfo[0];
                if (item.type){
                    if (UIDRequired(item.type)){

                        if (typePlusUIDInfo[1]){
                            item.uid = typePlusUIDInfo[1];
                        }else{
                            return makeError("error"," UID missing for "+key+".");
                        }
                    }
                }else{
                    return makeError("error"," Type of Metadata missing for "+key+".");
                }

            headerMap.push(item);
            }else{
                return makeError("error"," #XX.UID missing.Mapping information not present for "+key+".");
            }
        }
        return headerMap;
    }

    function makeError(outcome,errorMessage){
        returnObject.outcome = outcome;
        returnObject.errorMessage = errorMessage;
        return returnObject;
    }

    function UIDRequired(type){
        switch (type){
            case TAG_ATTRIBUTE :
            case TAG_DATAELEMENT : return true
            case TAG_REGISTRATION_DATE : return false
            default : return true;
        }
    }
}