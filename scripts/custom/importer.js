/**
 * Created by harsh on 7/5/16.
 */

function importer(type,data,metadata){

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

    function importTEI(index,data,tagToHeaderDataMap){
        if (index == data.length){return}
        var tei = new trackedEntityInstance();
        debugger
        tei.populateYourself(data[index],tagToHeaderDataMap);

    }

    function importData(){

        var headerData = extractHeaderInformation(data[0]);
            if (headerData.errorMessage){
                return headerData;
            }

        for (var i=0;i<metadata.length;i++){
            debugger
        }
        var item = {    key : key,
            tag : undefined,/*enum[de,attr,registrationDate]*/
            uid : undefined};
        headerData.push({})
        debugger
     //   var headerDataMapKeyWise = prepareIdToObjectMap(headerData,"key");
	var tagToHeaderDataMap = prepareIdToObjectMap(headerData,"tag");
        importTEI(0,data,tagToHeaderDataMap);
    //
     //   for (var i=0;i<data.length;i++){
	//    // create event
	//    //segregate attributes,and other fields
	//    var trackedEntityInstance = {
	//	orgUnit : headerDataMap[TAG_ORGUNIT],
	//	registrationDate : headerDataMap[TAG_REGISTRATION_DATE],
	//	trackedEntity : headerDataMap[TAG_TRACKED_ENTITIES],
	//	storedBy : "",
	//	attributes : [],
	//    }
	//
     //   }
    }

    function extractHeaderInformation(row1){
        var headerMap = [];
        for (var key in row1){
            var strings = key.split(FIRST_DELIMITER);
            if (strings[1]){
                var tagPlusUIDInfo = strings[1].split(SECOND_DELIMITER);
                var item = {    key : key,
                                tag : undefined,/*enum[de,attr,registrationDate]*/
                                uid : undefined};

                item.tag = tagPlusUIDInfo[0];
                if (item.tag){
                    if (UIDRequired(item.tag)){

                        if (tagPlusUIDInfo[1]){
                            item.uid = tagPlusUIDInfo[1];
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
