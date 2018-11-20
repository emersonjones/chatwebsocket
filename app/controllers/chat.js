module.exports.iniciaChat = function (application, req, res) {

	var dadosForm =  req.body;

	req.assert('apelido', 'nome ou apelido é obrigatorio').notEmpty();
	req.assert('apelido', 'nome ou apelidodeve ter entre 3 e 15 char').len(3, 15);
	
	var erros = req.validationErrors(); 

	if (erros){
		res.render("index", {validacao :  erros})
		res.send("existem erros no formulario");
		return;
	}

	res.render("chat");
}