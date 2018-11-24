/* DECLARAÇÃO DE VARIÁVEIS */
let escolhaJogador;
let escolhaCPU;
let mostrador = document.querySelector('#mostrador');
let pedra = document.querySelector('#btn-pedra');
let papel = document.querySelector('#btn-papel');
let tesoura = document.querySelector('#btn-tesoura');
let start = document.querySelector('#btn-start');
let lbJKP = document.querySelectorAll('.lb-jkp');
let btnJKP = document.querySelectorAll('.btn-jkp');

/* EVENTOS DE CLIQUE NOS BOTÕES */
pedra.onclick = () => {
    escolhaJogador = 'user-pedra';
    mostrador.style = 'visibility: hidden;';
    darFeedbackEscolha(0, 1, 2, '#ff2825');
    habilitarStart();
}
papel.onclick = () => {
    escolhaJogador = 'user-papel';
    mostrador.style = 'visibility: hidden;';
    darFeedbackEscolha(1, 0, 2, '#ffff00');
    habilitarStart();
}
tesoura.onclick = () => {
    escolhaJogador = 'user-tesoura';
    mostrador.style = 'visibility: hidden;';
    darFeedbackEscolha(2, 0, 1, '#00a000');
    habilitarStart();
}
start.onclick = () => {
    let maoJogador = document.querySelector('#mao-jogador');
    maoJogador.src = `assets/img/jokenpo-${escolhaJogador}.png`;
    maoJogador.style = 'animation: paused; opacity: 1;';

    let maoCPU = document.querySelector('#mao-cpu');
    escolhaCPU = definirMaoCPU();
    maoCPU.src = `assets/img/jokenpo-${escolhaCPU}.png`;
    maoCPU.style = 'animation: paused; opacity: 1;';

    mostrador.innerHTML = verificarResultado();
    mostrador.style = 'visibility: visible;' + colorirMostrador();
    resetarBotoes();
}

/* FUNÇÕES AUXILIARES */
const darFeedbackEscolha = (mostrar, apagar1, apagar2, cor) => {
    lbJKP[mostrar].style = 'visibility: visible;';
    lbJKP[apagar1].style = 'visibility: hidden;';
    lbJKP[apagar2].style = 'visibility: hidden;';
    btnJKP[mostrar].style = 'background-color:' + cor;
    btnJKP[apagar1].style = 'background-color: #b9b9b9';
    btnJKP[apagar2].style = 'background-color: #b9b9b9';
};

const habilitarStart = () => {
    start.disabled = false;
    start.style = 'cursor: pointer; background-color: #1ba8e9;';
};

const resetarBotoes = () => {
    start.disabled = true;
    start.style = 'cursor: not-allowed; background-color: #b9b9b9;';
    for (let i = 0; i < btnJKP.length; i++) {
        btnJKP[i].style = 'background-color: #b9b9b9';
        lbJKP[i].style = 'visibility: hidden;';
    }
};

const definirMaoCPU = () => {
    let random = Math.floor(Math.random() * 3);
    if(random == 0){
        return 'cpu-pedra';
    } else if (random == 1){
        return 'cpu-papel';
    }
    return 'cpu-tesoura';
};

const verificarResultado = () => {
    let cpu = escolhaCPU.substring(4);
    let user = escolhaJogador.substring(5);
    let resultado = '';

    if (cpu == user){
        resultado = "It's a draw";
    } else {
        if (cpu == 'pedra') {
            if (user == 'papel') {
                resultado = "You Win";
            } else {
                resultado = "CPU Wins";
            }
        } else if (cpu == 'papel') {
            if (user == 'pedra') {
                resultado = "CPU Wins";
            } else {
                resultado = "You Win";
            }
        } else {
            if (user == 'pedra') {
                resultado = "You Win";
            } else {
                resultado = "CPU Wins";
            }
        }
    }
    return resultado;
};

const colorirMostrador = () => {
    if (mostrador.innerHTML == 'CPU Wins'){
        return 'color: #FF0000;';
    } else if (mostrador.innerHTML == 'You Win') {
        return 'color: #008000;';
    }
};