window.onload = function(){

    let stage = document.getElementById('stage');
    let ctx = stage.getContext('2d'); // parte visual
    document.addEventListener("keydown", keyPush);
    setInterval(game, 90);

    const cobraAndar = 1; // ela vai andar uma casinha por movimento

    let velocidadeX = velocidadeY = 0; // velocidades iguais a 0
    let pontoX = 10; // iniciar nos pontos 10 do grafico X - abscissas
    let pontoY = 15; // iniciar nos pontos 15 do gráfico Y - ordenadas
    let tamanhoQuadrados = 10; // ele terá 10 de tamanho cada quadradinho (assim toda vez que eu andar, andarei 10px não importa o lado)
    let quantidadeDeQuadrados = 50; // Quantidade de quadrados de 10px que terá no jogo
    let comidaPontoX = 10;
    let comidaPontoY = 10; // É onde está a maca


    let rastroCobra = [];
    rastroAnterior = 5; // tamanho inicial do rabo da cobra

    function game(){
        pontoX += velocidadeX; // velocidade 0, a cobra vai ficar parada até iniciar o jogo
        pontoY += velocidadeY; // mesma coisa agr no outro ponto do gráfico

        // condição de atravessar as "paredes" -- condição para as 4 laterais do jogo
        if (pontoX < 0){
            pontoX = quantidadeDeQuadrados - 1; // caso ele passe do quadrato vai aparecer do outro lado, esse é o objetivo da condição
        }
        if (pontoX > quantidadeDeQuadrados -1){
            pontoX = 0;
        }
         if (pontoY > quantidadeDeQuadrados - 1){
            pontoY = 0; // caso ele passe do quadrato vai aparecer do outro lado, esse é o objetivo da condição
        }
        if (pontoY < 0){
            pontoY = quantidadeDeQuadrados - 1;
        }
        // cor do jogo e seu tamanho
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0, stage.clientWidth, stage.height);

        // cor e quadrado que a comida terá
        ctx.fillStyle = 'orange';
        ctx.fillRect(comidaPontoX*tamanhoQuadrados, comidaPontoY*tamanhoQuadrados,tamanhoQuadrados,tamanhoQuadrados);


        // Cor e tamanho da cauda da cobrinha
        var img = document.getElementById("img");
        var cobra = ctx.createPattern(img, "repeat");
        ctx.fillStyle = cobra;

        for (let i = 0; i < rastroCobra.length; i++){
            ctx.fillRect(rastroCobra[i].x*tamanhoQuadrados ,rastroCobra[i].y*tamanhoQuadrados, tamanhoQuadrados,tamanhoQuadrados);
            if (rastroCobra[i].x == pontoX && rastroCobra[i].y == pontoY){
                velocidadeX = velocidadeY = 0;
                rastroAnterior = 1;
            }
        }
        rastroCobra.push({x:pontoX, y:pontoY });

        // Função de ao comer a comida ela aumente uma cauda

        while(rastroCobra.length > rastroAnterior){ 
            rastroCobra.shift();
        }
        if(comidaPontoX == pontoX && comidaPontoY == pontoY){
            rastroAnterior++;
            comidaPontoX = Math.floor(Math.random()*quantidadeDeQuadrados);
            comidaPontoY = Math.floor(Math.random()*quantidadeDeQuadrados);

        }
    }
function keyPush(event){

    switch (event.keyCode) {
        case 37: //left
            velocidadeX = -cobraAndar;
            velocidadeY = 0;
            break;

        case 38: //up
            velocidadeX = 0
            velocidadeY = -cobraAndar;
            break;

        case 39: //right
            velocidadeX = cobraAndar;
            velocidadeY = 0;
            break;

        case 40: //down
            velocidadeX = 0;
            velocidadeY = cobraAndar;
            break;

        default:

            break;
    }

    }
}

// Ajuda do youtube e conteudos do canvas <3 