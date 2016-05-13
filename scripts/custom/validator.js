/**
 * Created by harsh on 7/5/16.
 */

function validateMetaData(type,metadata){
    if (!metadata) {
        return [{description : METADATA_SHEET + "Not Present"}];
    }

    var data = metadata[0];
    switch(type){
        case TRACKER_REGISTRATION_PLUS_ENROLLMENT :
            return validate(TRACKER_PROGRAM_UID,TRACKER_TRACKED_ENTITY);
            break;
    }

    function validate(){
        var errorList = [];

        if (!data[TRACKER_PROGRAM_UID]){
            errorList.push({description : "Program UID not mapped"});
        }
        if (!data[TRACKER_TRACKED_ENTITY]){
            errorList.push({description : "Tracked Entity UID not mapped"});
        }

        return errorList;
    }
}