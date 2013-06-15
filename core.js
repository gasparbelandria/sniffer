var util = require('util');
var url = require('url');

exports.sniffOn = function(server){
	// Emitido cada vez que hay un request.
	// request es una instancia de http.ServerResponse
	// response es una instancia de http.ServerResponse
	server.on('request', function(req,res){
		util.log('request');
		util.log(reqToString(req));
	});

	// Llamado cuando un nuevo stream TCP es establecido.
	// stream es un objeto de tipo net.Stream.
	// En general los usuarios no quieren acceder a este evento.
	// El stream puede tambien ser accedido en request.connection.
	// var e_connection = function(stream)
	// };

	// Emitido cuando el servidor se cierra
	server.on('close', function(errno){
		util.log('close errno: ' + errno);
	});

	// Emitido cada vez que una request con un http Expect: 100-continue es recibida.
	// Si el evento no lo esta escuchando,
	// el servidor automaticamente respondera con el 100 Continue como apropiado.
	// Manejar este evento incluye llamar a response.writeContinue
	// si el cliente debe continuar enviando en nuevo request,
	// o generando una respuesta HTTP apropieda (p.e. 400 Bad Request)
	// si el cliente no debe continuar enviado en cuerpo request.
	server.on('checkContinue', function(req,res){
		util.log('checkContinue');
		util.log(reqToString(req));
		res.writeContinue();
	});

	// Emitido cada vez que el cliente requests una actualizacion http.
	// Si el cliente no lo etsa oyendo,
	// entonces los clientes que han solicitado la actualizacion tendran sus conexiones cerradas.
	server.on('upgrade', function(req,socket,head){
		util.log('upgrade');
		util.log(reqToString(req));
	});

	// Si una conexion cliente emite un nuevo 'error' event - sera trasmitido aqui
	server.on('clientError', function(){
		util.log('clientError');
	});

}
var reqToString = function(req){
	var ret = 'request' + req.method + ' ' + req.httpVersion + ' ' + req.url + '\n';
		ret += JSON.stringify(url.parse(req.url, true)) + '\n';
	var keys = Object.keys(req.headers);
	var j = keys.length;
	for (var i = 0; i < j; i++){
		var key = keys[i];
		ret += i + ' ' + key + ': ' + req.headers[key] + '\n';
	}

	if (req.trailers) ret += req.trailers + '\n';
	return ret;

}

exports.reqToString = reqToString;