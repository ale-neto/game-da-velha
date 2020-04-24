var rodada = 1;
var matrizJogo = Array(3);

matrizJogo['a'] = Array(3); 
matrizJogo['b'] = Array(3);
matrizJogo['c'] = Array(3);

matrizJogo['a'][1] = 0;
matrizJogo['a'][2] = 0;
matrizJogo['a'][3] = 0;

matrizJogo['b'][1] = 0;
matrizJogo['b'][2] = 0;
matrizJogo['b'][3] = 0;

matrizJogo['c'][1] = 0;
matrizJogo['c'][2] = 0;
matrizJogo['c'][2] = 0;

$(document).ready(function() {
	$('#btnIniciarJogo').click(function(){

		if ($('#apelido1').val() == '') {
			alert('Apelido do jogador 1 não foi preenchido. ');	
			return false; 
		}

		if ($('#apelido2').val() == '') {
			alert('Apelido do jogador 2 não foi preenchido. ');	
			return false; 
		}

		$('#nome1').html($('#apelido1').val());
		$('#nome2').html($('#apelido2').val());

		$('#pagina_inicial').hide();
		$('#palco_jogo').show();
	});	

	$('.jogada').click(function(){
		var campoId = this.id;
		$('#'+campoId).off();
		jogada(campoId);	
	});

	function jogada(id){
		var icone = '';
		var ponto = 0;

		if ((rodada % 2) == 1) {
			icone = 'url("imagens/marcacao_1.png")';
			ponto = -1;
		}else{
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;
		}	
		rodada++;
		$('#'+id).css('background-image', icone);
		
		var linhaColuna = id.split('-');
		matrizJogo[linhaColuna[0]][linhaColuna[1]] = ponto;
		verificarCombinacao();
	}

	function verificarCombinacao(){
		
		var pontos = 0;
		//Vertical
		for (var i = 1; i <= 3; i++) {
			pontos = pontos + matrizJogo['a'][i];
		}
		ganhador(pontos);
		pontos = 0;
		for (var i = 1; i <= 3; i++) {
			pontos = pontos + matrizJogo['b'][i];
		}
		ganhador(pontos);

		pontos = 0;
		for (var i = 1; i <= 3; i++) {
			pontos = pontos + matrizJogo['c'][i];
		}
		ganhador(pontos);
		
		//Horizontal
		for (var l = 1; l < 3; l++) {
			pontos = 0;
			pontos = pontos + matrizJogo['a'][l];
			pontos = pontos + matrizJogo['b'][l];
			pontos = pontos + matrizJogo['c'][l];
			ganhador(pontos);
		}

		pontos = 0;
		pontos = matrizJogo['a'][1] + matrizJogo['b'][2] + matrizJogo['c'][3];
		ganhador(pontos);
		pontos = 0;
		pontos = matrizJogo['a'][3] + matrizJogo['b'][2] + matrizJogo['c'][1];
		ganhador(pontos);
	}

	function ganhador(pontos){
		if(pontos == -3){
			var jogador1 = $('#apelido1').val();
			alert(jogador1 + ' é o vencedor');
			$('.jogada').off();
		} else if(pontos == 3){
			var jogador2 = $('#apelido1').val();
			alert(jogador2 + ' é o vencedor');
			$('.jogada').off();
		}
	}
});