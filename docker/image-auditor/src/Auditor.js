var PORT = 9907;
var HOST = '239.255.22.5';
var dgram = require('dgram');
var moment = require('moment');
var server = dgram.createSocket('udp4');
moment().format();
var net = require('net');


var serverTCP = net.createServer();



serverTCP.on('connection', sendJson);


serverTCP.listen(2205);


function sendJson(socket) {
	console.log("new client");
	var infos = [];
	for(var key of autreTableau.keys()){
		var message = new Object(); 
		message.uuid = key;
		message.instrument = autreTableau.get(key).instrument;
		message.activeSince = autreTableau.get(key).activeSince;
		var payload = JSON.stringify(message);
		infos.push(payload);
	}
	var finalPayload = JSON.stringify(infos)
	socket.write(finalPayload);
	socket.end();
	
	
	
}





var activeInstruments = new Map();
var autreTableau = new Map();
var instrumentSounds = new Map();

instrumentSounds.set('ti-ta-ti', 'piano');
instrumentSounds.set('pouet', 'trumpet');
instrumentSounds.set('trulu', 'flute');
instrumentSounds.set('gzi-gzi', 'violin');
instrumentSounds.set('boum-boum', 'drum');

server.on('listening', function(){
	var address = server.address();
	console.log('UDP Server listening on ' + address.address + ':' + address.port);
});
server.bind(PORT,function(){
	console.log("Joining multicast group");
	server.addMembership(HOST);
});

server.on('message', function (message, remote){
	console.log(remote.address + ':' + remote.port +' - ' + message);
	var instrument = JSON.parse(message);
	var now = moment();
	
	if(!activeInstruments.has(instrument.id)){
		var infos = new Object();
		infos.instrument = instrument.sound;
		infos.activeSince = now;
		autreTableau.set(instrument.id, infos)
	}
	activeInstruments.set(instrument.id, now);
	
	for (var key of activeInstruments.keys()){
		console.log(key + " : " + activeInstruments.get(key));
	}
});

setInterval(function(){	

	for(var key of activeInstruments.keys()){
		var diff = moment() - activeInstruments.get(key);
		if(diff > 5){
			activeInstruments.delete(key);
			autreTableau.delete(key);
		}
	}
	
}, 1000);





