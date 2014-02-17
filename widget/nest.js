var tempType="";
var windowHeight;
var windowWidth;
var temValue = 0;

$(document).ready(function() {
    init();
});

// first message received from application muzzley, to set initial status of Nest

muzzley.on('nest_status', function(data, callback){
    tempType = data.nestTemperatureType;
    if(tempType === "C"){
        tempType = "º";
    }
    temValue = data.nestTemperature;
    $("#tempV").text(temValue + " " +tempType);$("#tempValue span").text(temValue + " " +tempType);
    $("#humValue span").text(data.nestHumidity+"%");
    
    if(data.nestOnline){
        $("#network span").text(" Online"); 
        $("#network span").css("color", "#59A7C1");
    }else{
        $("#network span").text(" Offline");
        $("#network span").css("color", "#ED1C24");
    }
    if(data.nestAway === true){
        $("#away_value").attr("checked", true); $("#home_value").attr("checked", false);
    }else{
        $("#away_value").attr("checked", false); $("#home_value").attr("checked", true);
    }
    if(data.nestOff === true){
        $("#lightbox-nest .status span").text(" OFF");
        $("#lightbox-nest .status span").css("color", "#ED1C24");
    }else{
        $("#lightbox-nest .status span").text(" ON");
        $("#lightbox-nest .status span").css("color", "#64BF4B");
    }
    
    $("#lightbox-nest .object-id").text("ID: "+data.nestId);
});

// change temperature of Nest
$("#tempLeft").on("click", function(){
    --temValue;
    $("#tempValue span").text(temValue + " " +tempType);
    $("#tempV").text(temValue + " " +tempType);
    muzzley.send("nest_setTemperature", {newTemperatureValue: temValue} );
});
$("#tempRight").on("click", function(){
    ++temValue;
    $("#tempValue span").text(temValue + " " +tempType);
    $("#tempV").text(temValue + " " +tempType);
    muzzley.send("nest_setTemperature", {newTemperatureValue: temValue} );
});

//change away/home status of Nest
$( "#away_value" ).on("click", function(){
    $("#away_value").attr("checked", true); $("#home_value").attr("checked", false);
    muzzley.send("nest_setAway", {value: true} );
});

$( "#home_value" ).on("click", function(){
    $("#away_value").attr("checked", false); $("#home_value").attr("checked", true);
    muzzley.send("nest_setAway", {value: false} );
});

////////////////////////////

// From here are functions to change images
// and adapt the layout to fit all resolutions of smartphones

////////////////////////////

function init(){
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;

    var btFontSize = parseInt($("body").height()/20)+"px";
    $("#tempV").css("font-size", btFontSize);
    
    var margin = parseInt($("#lightbox-img-nest").css("margin"));
    margin = margin*2;
    $("#lightbox-nest").css("height", (windowHeight - 100));
    $("#lightbox-nest").css("width", (windowWidth - 40));
    
    //alert(windowWidth+"*"+windowHeight);
    var btFontSize = parseInt($("body").height()/30)+"px";
    $(".object-name").css("font-size", btFontSize);
    $(".object-id").css("font-size", btFontSize);
    $("#lightbox-nest .status").css("font-size", btFontSize);
    $("#lightbox-nest #network").css("font-size", btFontSize);
    $(".rows").css("font-size", btFontSize);
}



