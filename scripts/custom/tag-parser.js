/**
 * Created by harsh on 10/5/16.
 */

function assembleHeaderInfo(row1,isMappingSeparate){
    var headerMap = [];
    for (var key in row1){

        var fullTag = row1[key].data.split(FIRST_DELIMITER)[1];
        if (fullTag){
            var domain = fullTag.split(SECOND_DELIMITER)[0];
            if (!isValidDomain(domain)){ continue}
            var field = fullTag.split(SECOND_DELIMITER)[1];
            var fieldArgs = undefined;
            if (field){
                fieldArgs = field.split(THIRD_DELIMITER)[1];
                if (fieldArgs){
                    fieldArgs= fieldArgs.trim();
                }
                field = field.split(THIRD_DELIMITER)[0];

                if (!isValidField(field)){continue}
            }
            var item = {    key : row1[key].key,
                            domain : domain,
                            field : field,
                            args : fieldArgs
                        }
            }else{ continue }

            headerMap.push(item);
        }
    return headerMap;
}

function isValidDomain(domain){
    for (var key in DOMAINS){
        if (DOMAINS[key] == domain){
            return true
        }
    }
    if(/ev\d{1,}/.test(domain)){
        return true;
    }
    return false;
}

function isValidField(field){
    for (var key in FIELDS){
        if (FIELDS[key] == field){
            return true
        }
    }
    return false;
}

