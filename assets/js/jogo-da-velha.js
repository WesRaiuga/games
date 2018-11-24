const tabuleiro = document.querySelectorAll('.casa');
const jogadorAtual = document.querySelector('#jogadorAtual');
const restart = document.querySelector('#restart');
const mostrador = document.querySelector('#mostrador');
let resultado = document.querySelector('#resultado');
let jogada = 0;

// Percorre o tabuleiro e se houver um clique numa das casas, chama a função jogar()
for (let i = 0; i < tabuleiro.length; i++) {
    tabuleiro[i].addEventListener("click", function(e) {
        jogar(this);
    });
}

// Função que aplica a jogada
const jogar = (casa) => {
    let marca = definirMarca();

    if(casa.innerHTML == ''){
        casa.innerHTML = marca;
        trocarMostrador(marca);
        jogada++;
        verificarFimDeJogo(jogada);
    }    
};

// Função que verifica se o jogo acabou
const verificarFimDeJogo = (jogada) => {
    let vencedor = verificarVencedor();
    if( vencedor != 'Draw' ){
        resultado.innerHTML = `Player <span id="vencedor">${vencedor}</span> wins!!!`;
        resultado.style = 'display: block;';
        mostrador.style = 'display: none;';
        for (let i = 0; i < tabuleiro.length; i++) {
            if(tabuleiro[i].innerHTML == ''){
                tabuleiro[i].innerHTML = ' ';
            }
        }
    }else if(jogada >= 9){
        resultado.innerHTML = "It's a Draw";
        resultado.style = 'display: block;';
        mostrador.style = 'display: none;';
    }
};

// Função que verifica condição de vitória ou empate
const verificarVencedor = () => {
    if( casasIguais(0,1,2,'O') || casasIguais(3,4,5,'O') || casasIguais(6,7,8,'O')
        || casasIguais(0,3,6,'O') || casasIguais(1,4,7,'O') || casasIguais(2,5,8,'O')
        || casasIguais(0,4,8,'O') || casasIguais(2,4,6,'O') ){
        return 'O';
    }else if( casasIguais(0,1,2,'X') || casasIguais(3,4,5,'X') || casasIguais(6,7,8,'X')
    || casasIguais(0,3,6,'X') || casasIguais(1,4,7,'X') || casasIguais(2,5,8,'X')
    || casasIguais(0,4,8,'X') || casasIguais(2,4,6,'X') ){
        return 'X';
    }
    return 'Draw';
};

// Função que verifica se as casas possuem a mesma letra
const casasIguais = (a, b, c, letra) => {
    if(tabuleiro[a].innerHTML == letra && tabuleiro[b].innerHTML == letra && tabuleiro[c].innerHTML == letra){
        return true;
    }
    return false;
};

// Função que troca o jogador atual no mostrador
const trocarMostrador = (marca) => {
    if(marca == 'O'){
        jogadorAtual.innerHTML = 'X';
    }else{
        jogadorAtual.innerHTML = 'O';
    }
};

// Função que define a letra que a jogada seguinte escreverá
const definirMarca = () => {
    if(jogada % 2 == 0){
        return 'O';
    }
    return 'X';
};

// Ao clicar em RESTART, o jogo reseta
restart.onclick = () => {
    jogada = 0;
    jogadorAtual.innerHTML = 'O';
    mostrador.style = 'display: block;';
    resultado.style = '';
    for (const casa of tabuleiro) {
        casa.innerHTML = '';
    }
};