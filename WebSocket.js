var rainbowEnable = false;
var ledsOn = true;

/*
var connection = new WebSocket('ws://'+location.hostname+':81/', ['arduino']);

connection.onopen = function () {
    connection.send('Connect ' + new Date());
};
connection.onerror = function (error) {
    console.log('WebSocket Error ', error);
};
connection.onmessage = function (e) {  
    console.log('Server: ', e.data);
};
connection.onclose = function(){
    console.log('WebSocket connection closed');
};
*/

    
var http = new XMLHttpRequest();
function post_without_reload(path, params, method) {
    if (http) {
        http.abort();
    }
    http = new XMLHttpRequest();
    http.open(method, path, true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http.send(params);
}


ColorPicker(document.getElementById('mycolorpicker'), function (hex, hsv, rgb) {
    document.body.style.backgroundColor = hex;
    post_without_reload("/", "red=" + rgb.r + "&blue=" + rgb.b + "&green=" + rgb.g, "POST");
    connection.send();
});




function sendRGB() {
    //console.log(document.getElementById('r').value);
    //console.log(document.getElementById('g').value);
    //console.log(document.getElementById('b').value);
    var r = document.getElementById('r').value**2/1023;
    var g = document.getElementById('g').value**2/1023;
    var b = document.getElementById('b').value**2/1023;
    //console.log('var r: ' + r);
    
    var rgb = r << 20 | g << 10 | b;
    //console.log('rgb-'+rgb);
    var rgbstr = '#'+ rgb.toString(16);    
    //console.log('RGB: ' + rgbstr); 
    //connection.send(rgbstr);
}


function rainbowEffect(){
    rainbowEnable = ! rainbowEnable;
    if(rainbowEnable){
        console.log('Rainbow effect: on');
        //connection.send("R");

    } else {
        console.log('Rainbow effect: off');
        //connection.send("N");
    }
}

function ledsOnOff(){
    ledsOn = ! ledsOn;
    if(ledsOn){
        console.log('LEDs: on');
        document.getElementById('onoff').style.backgroundColor = '#00878F';
    } else {
        console.log('LEDs: off');
        document.getElementById('onoff').style.backgroundColor = '#999';
    }
}


function saveConnectorStates(){
    var connectorStates='';
    for (i = 1; i <= 8; i++) {        
        if(document.getElementById('checkbox'+i).checked == true)
        {
            connectorStates += '1,';
        }
        else{
            connectorStates += '0,';
        }
    }
    console.log('connectorStates: ' + connectorStates);
    //connection.send("CS-"+connectorStates)
}


function reboot_esp8266(){
    console.log('rebooting...');
}
