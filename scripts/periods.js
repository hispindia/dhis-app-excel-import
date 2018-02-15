//period type : daily
function daily(sD , eD)
{
    var sDate = new Date(sD);
    var eDate = new Date(eD);
    var dateString = "Select Period";

    while(sDate <= eDate)
    {
        var month = (sDate.getMonth()+1)>9 ? (sDate.getMonth()+1) : "0"+(sDate.getMonth()+1);
        var day = (sDate.getDate())>9 ? sDate.getDate() : "0"+sDate.getDate();
        var dhisDate = sDate.getFullYear()+""+month+""+day;
        dateString = (dateString == "") ? dhisDate : (dateString + ";" + dhisDate);
        sDate.setDate(sDate.getDate() + 1);
    }
    return dateString;
}

//period type : weekly
function weekly(sD , eD)
{
    var unchangedStartDate = new Date(sD);
    var startDate = new Date(sD);
    var endDate = new Date(eD);

    //making start date's day to the prior Monday
    if(startDate.getDay() == 0)
        startDate.setDate(startDate.getDate()-6);
    else if(startDate.getDay()>1)
        startDate.setDate(startDate.getDate()-startDate.getDay()+1);

    //making start date's day to the prior Sunday
    endDate.setDate(endDate.getDate()-endDate.getDay());

    // *****************************************************************************************

    // date for looping
    var sDate = new Date(sD);
    sDate.setDate(1);
    sDate.setMonth(0);
    var dateString = "Select Period";

    //making start date's day to the first Monday of the year or last Monday of the previous year
    if(sDate.getDay() == 0)
        sDate.setDate(sDate.getDate()-6);
    else if(sDate.getDay()>1)
        sDate.setDate(sDate.getDate()-sDate.getDay()+1);

    var week = 0;
    var year = "";

    var isFirstIteration = true;

    while(sDate <= endDate)
    {

        var dummyYear = sDate.getFullYear();

        if(isFirstIteration)
            year = unchangedStartDate.getFullYear();
        else
            year = sDate.getFullYear();

        week++;

        if( sDate.getDate() == startDate.getDate() && sDate.getMonth() == startDate.getMonth() && sDate.getFullYear() == startDate.getFullYear())
        {
            var dhisDate = ( week > 9 ) ? ( year + "W" + week ) : ( year + "W" + week );
            startDate = sDate;
            dateString = ( dateString == "" ) ? dhisDate : ( dateString + ";" + dhisDate);
        }

        sDate.setDate(sDate.getDate()+7);
        if( dummyYear < sDate.getFullYear() && !isFirstIteration)
            week = 0;

        if(isFirstIteration)
            isFirstIteration = false;
    }

    return dateString;
}



function weeklynew(sD , eD)
{
    var unchangedStartDate = new Date(sD);
    var startDate = new Date(sD);
    var endDate = new Date(eD);

    //making start date's day to the prior Monday
    if(startDate.getDay() == 0)
        startDate.setDate(startDate.getDate()-6);
    else if(startDate.getDay()>1)
        startDate.setDate(startDate.getDate()-startDate.getDay()+1);

    //making start date's day to the prior Sunday
    endDate.setDate(endDate.getDate()-endDate.getDay());

    // *****************************************************************************************

    // date for looping
    var sDate = new Date(sD);
    sDate.setDate(1);
    sDate.setMonth(0);
    var dateString = "Select Period";

    //making start date's day to the first Monday of the year or last Monday of the previous year
    if(sDate.getDay() == 0)
        sDate.setDate(sDate.getDate()-6);
    else if(sDate.getDay()>1)
        sDate.setDate(sDate.getDate()-sDate.getDay()+1);

    var week = 0;
    var year = "";

    var isFirstIteration = true;

    while(sDate <= endDate)
    {

        var dummyYear = sDate.getFullYear();

        if(isFirstIteration)
            year = unchangedStartDate.getFullYear();
        else
            year = sDate.getFullYear();

        week++;

        if( sDate.getDate() == startDate.getDate() && sDate.getMonth() == startDate.getMonth() && sDate.getFullYear() == startDate.getFullYear())
        {
            var dhisDate = ( week > 9 ) ? ( year + "W" + week ) : ( year + "W" + week );
            startDate = sDate;
            dateString = ( dateString == "" ) ? dhisDate : ( dateString + ";" + dhisDate);
        }

        sDate.setDate(sDate.getDate()+7);
        if( dummyYear < sDate.getFullYear() && !isFirstIteration)
            week = 0;

        if(isFirstIteration)
            isFirstIteration = false;
    }

    return dateString;
}

//period type : monthly
function monthly(sD , eD)
{
    var sDate = new Date(sD);
    sDate.setDate(1);
    var eDate = new Date(eD);
    eDate.setDate(1);

    var dateString = "Select Period";

    while(sDate <= eDate)
    {
        var month = ( sDate.getMonth() + 1 ) > 9 ? ( sDate.getMonth() + 1 ) : "0"+( sDate.getMonth() + 1 );
        var dhisDate = sDate.getFullYear() + "" + month;
        dateString = ( dateString == "" ) ? dhisDate : ( dateString + ";" + dhisDate );
        sDate.setMonth( sDate.getMonth() + 1 );
    }

    return dateString;
}

//period type : yearly
function yearly(sD , eD)
{
    var sDate = new Date(sD);
    sDate.setDate(1);
    sDate.setMonth(0);
    var eDate = new Date(eD);
    eDate.setDate(1);
    eDate.setMonth(0);

    var dateString = "Select Period";

    while(sDate <= eDate)
    {
        var dhisDate = sDate.getFullYear();
        dateString = ( dateString == "" ) ? dhisDate : ( dateString + ";" + dhisDate );
        sDate.setYear( sDate.getFullYear() + 1 );
    }

    return dateString;
}

//period type : quartly
function quartly(sD , eD)
{

    var dateString = "Select Period;2014Q1;2014Q2;2014Q3;2014Q4;2015Q1;2015Q2;2015Q3;2015Q4;2016Q1;2016Q2;2016Q3;2016Q4";

    return dateString;
}

function SixMnthly() {
    var DateString="Select Period;2014S1;2014S2;2015S1;2015S2;2016S1;2016S2;2017S1;2017S2;2018S1;2018S2"

    return DateString;
}

function SixMnthlyApril() {
    var dateString="Select Period;2014AprilS1;2014AprilS2;2015AprilS1;2015AprilS2;2016AprilS1;2016AprilS2;2017AprilS1;2017AprilS2";
    return dateString;
}