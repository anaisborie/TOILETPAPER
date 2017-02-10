var request = require('request')
var SerialPort = require("serialport")
var noArduino = false;

if (!noArduino) {
  var port = new SerialPort("/dev/cu.usbmodem1421", {
    baudRate: 9600
  })
}

var previousRate
var difference

setInterval(function(){
	request("http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json", function(error, response, body){
		var parsed = JSON.parse(body)
		var found
		for (var i=0; i<parsed.list.resources.length; i++){
			if (parsed.list.resources[i].resource.fields.name == 'USD/EUR') {
				found = parsed.list.resources[i].resource.fields
				break
			}
		}

  //difference = parseInt(((previousRate - found.price)*10000))
    difference = Math.abs(Math.round((previousRate - found.price)*10000))
    //console.log((previousRate - found.price)*10000)
    console.log(difference)

		if (found === undefined) console.log('WTF?')
		else {
			console.log(found.price)
			if (found.price > previousRate) {
				console.log('changed up!')
        for(var i = 0; i<difference; i++) {
  				port.write('u')
        }
			} else if (found.price < previousRate) {
				console.log('changed down!')
        for(var i = 0; i<difference; i++) {
  				port.write('d')
        }
			}
			previousRate = found.price
		}
	})
}, 2500)
