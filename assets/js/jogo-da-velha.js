const tabuleiro = document.querySelectorAll('.casa');
const mostrador = document.querySelector('#mostrador');
const jogadorAtual = document.querySelector('#jogadorAtual');
let jogada = 0;

// Percorre o tabuleiro e se houver um clique numa das casas, chama a função jogar()
for (let i = 0; i < tabuleiro.length; i++) {
    tabuleiro[i].addEventListener("click", function(e) {
        jogar(this);
    });
}

// Função que aplica a jogada
function jogar(casa){
    let marca = definirMarca();

    trocarMostrador(marca);

    if(casa.innerHTML == ''){
        casa.innerHTML = marca;
        jogada++;
        verificarFimDeJogo(jogada);
    }    
}

// Função que verifica se o jogo acabou
function verificarFimDeJogo(jogada){
    let vencedor = verificarVencedor();
    if( vencedor != null ){
        mostrador.innerHTML = `Player <span id="vencedor">${vencedor}</span> wins!!!`;
        for (let i = 0; i < tabuleiro.length; i++) {
            if(tabuleiro[i].innerHTML == ''){
                tabuleiro[i].innerHTML = ' ';
            }
        }
    }else if(jogada >= 9){
        mostrador.innerHTML = `Empatou`;
    }
}

function verificarVencedor(){
    if( casasIguais(0,1,2,'O') || casasIguais(3,4,5,'O') || casasIguais(6,7,8,'O')
        || casasIguais(0,3,6,'O') || casasIguais(1,4,7,'O') || casasIguais(2,5,8,'O')
        || casasIguais(0,4,8,'O') || casasIguais(2,4,6,'O') ){
        return 'O';
    }else if( casasIguais(0,1,2,'X') || casasIguais(3,4,5,'X') || casasIguais(6,7,8,'X')
    || casasIguais(0,3,6,'X') || casasIguais(1,4,7,'X') || casasIguais(2,5,8,'X')
    || casasIguais(0,4,8,'X') || casasIguais(2,4,6,'X') ){
        return 'X';
    }else{
        return null;
    }
}

function casasIguais(a, b, c, letra){
    if(tabuleiro[a].innerHTML == letra && tabuleiro[b].innerHTML == letra && tabuleiro[c].innerHTML == letra){
        return true;
    }
    return false;
}

function trocarMostrador(marca){
    if(marca == 'O'){
        jogadorAtual.innerHTML = 'X';
    }else{
        jogadorAtual.innerHTML = 'O';
    }
}

function definirMarca(){
    if(jogada % 2 == 0){
        return 'O';
    }
    return 'X';
}
