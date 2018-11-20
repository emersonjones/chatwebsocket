var app = require("./config/server");

var server = app.listen(80, function () {
	console.log("servidor online");
});

var io = require('socket.io').listen(server);


//criando a conexao com websocket
//emite pede para executar uma acao
//on ouve pedidos de execucao

app.set('io', io);

io.on('connection', function(socket){
	
	console.log('usuario conectou');
	
	socket.on('disconnect',function(){
		console.log('usuario desconectou');
	});

	/*dialogo*/
	socket.on('msgParaServidor', function(data){
		//para o usuario que enviou
		socket.emit(
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		//para todos os usuarios
		socket.broadcast.emit(
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		/*participantes*/
		if(parseInt(data.apelido_atualizado_nos_clientes) ==0 ){
			socket.emit(
				'participantesParaCliente',
				{apelido: data.apelido}
			);

			//para todos os participantes online no chat via socket
			socket.broadcast.emit(
				'participantesParaCliente',
				{apelido: data.apelido}
			);
		}

	});




});


