var uuid = require('uuid');
var dgram = require('dgram');
var s = dgram.createSocket('udp4');


var protocol = new Object();
protocol.HOST = '239.255.22.5';
protocol.PORT = 9907;

var id = uuid.v1();
var instrument = process.argv[2];
var sound;

switch(instrument){
	case 'piano':
		sound = 'ti-ta-ti';
		break;
	case 'trumpet':
		sound = 'pouet';
		break;
	case 'flute':
		sound = 'trulu';
		break;
	case 'violin':
		sound = 'gzi-gzi';
		break;
	case 'drum':
		sound = 'boum-boum';
		break;
}

console.log('Instrument: '+ process.argv[2]+'\nSound: '+ sound +'\nId: '+ id +'\n');

var message = new Object();
message.id = id;
message.sound = sound;

var payload = JSON.stringify(message);
message = new Buffer(payload);

setInterval(function(){	
	s.send(message, 0, message.length, protocol.PORT, protocol.HOST, function(err, bytes){
		if (err) throw err;
		console.log('UDP message sent to ' + protocol.HOST +':'+ protocol.PORT);	
	});
}, 1000);

