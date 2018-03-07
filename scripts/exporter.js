/**
 * Created by Wasib on 26/02/18.
 */

function exportData(startDate,endDate,program,ou){
const dateFormat = "YYYY-MM-DD";
    var anonymousAttributes = {};
var counter = 0;
    var jsonData = {
        trackedEntityInstance : [],
        enrollments : [],
        events: []
    };

    getTEAttributes().then(function(tea){

        for (var key in tea){
            if (tea[key].attributeValues.length > 0){
                var val = extractMetaAttributeValue(tea[key].attributeValues,Anonymous_Attribute_Code);
                if (val){
                    anonymousAttributes[tea[key].id] = tea[key];
                }
            }
        }

        //get all TEI
        getTEIBetweenDateAndProgram(moment(startDate).format(dateFormat),moment(endDate).format(dateFormat),program.id,ou.id)
            .then(function(teis){

                for (var i=0;i<teis.length;i++){
                    anonymizeTEAS(anonymousAttributes,teis[i].attributes);
                }

                jsonData.trackedEntityInstance = teis;
                counterCallback();
            });
    })


    getEnrollmentsBetweenDateAndProgram(moment(startDate).format(dateFormat),moment(endDate).format(dateFormat),program.id,ou.id).then(function(enrollments){
        jsonData.enrollments = enrollments;
        counterCallback();
    });

    getEventsBetweenDateAndProgram(moment(startDate).format(dateFormat),moment(endDate).format(dateFormat),program.id,ou.id).then(function(events){
        jsonData.events = events;
        counterCallback();
    });

    function counterCallback(){
        counter++;
        if (counter >2){
            download(JSON.stringify(jsonData), 'tracker-'+moment(new Date()).format("YYYY-MM-DD h:mm:ss")+'.json', 'application/json');
        }
    }
}

function anonymizeTEAS(map,teas){

    for (key in map){
        for (var i=0;i<teas.length;i++){
            if (teas[i].attribute == key){
                var attr = map[key];
                switch(attr.valueType){
                    case "TEXT":
                            teas[i].value = "ANONYMOUS";
                        break
                    case "PHONE_NUMBER":
                        teas[i].value = "0000000000";
                        break
                    case "DATE" :
                        teas[i].value = "1970-01-01";
                        break
                }
            }
        }
    }
}
function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}

function getEvent(index,map,teis,program,ou,teiMap){
    if (index == teis.length){
        return;
    }
    var tei = teis[index].trackedEntityInstance;
    teiMap[tei] = teis[index];
    map[tei]={};
    var param = {
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: '../../events?trackedEntityInstance='+tei+'&program='+program.id+'&orgUnit='+ou.id+'&ouMode=DESCENDANTS&skipPaging=true',
    };
    request(param,callback);

    function callback(error,response,body){
        if (error){

        }else{
            for (var i=0;i<response.events.length;i++){
                var ev = response.events[i];
                map[tei][ev.event] = ev;
            }
        }
        getEvent(index+1,map,teis,program,ou,teiMap);
    }
}