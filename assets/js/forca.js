function Dom() {
    this.chances = document.querySelector('#chances');
    this.tema = document.querySelector('#tema');
    this.palavra = document.querySelector("#palavra");
    this.resposta = document.querySelector('#resposta');
    this.letras = document.querySelector("#letras");
    this.botoesLetras;

    this.criaElemento = (tagName, className, content) => {
        const elem = document.createElement(tagName);
        elem.className = className;
        elem.innerHTML = content;
        return elem;
    }

    this.carregarLacunas = (palavraAtual) => {
        this.palavra.innerHTML = '';
        for (const i in palavraAtual) {
            if (palavraAtual.charAt(i) == " ") {
                this.palavra.appendChild( this.criaElemento( 'span', `letra${i}`, '-' ) );
            } else {
                this.palavra.appendChild( this.criaElemento( 'span', `letra${i}`, '_' ) );
            }
        }
    }

    this.carregarBotoesLetras = () => {
        this.letras.innerHTML = '';
        const alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        for (let i = 0; i < alfabeto.length; i++) {
            this.letras.appendChild( 
                this.criaElemento( 'button', 'btn-letra',alfabeto[i] )
            );
        }
    }
}

function Configuracoes() {
    this.chances = 6;
}

const Letra = function() {
    this.index = 0;
    this.name = '';
}

function Jogo(palavra) {
    this.dom = new Dom();
    this.config = new Configuracoes();
    this.palavraAtual = palavra.word.toUpperCase();
    this.temaAtual = palavra.theme.toUpperCase();
    this.letraAtual = new Letra();

    this.carregarElementosNaTela = () => {
        this.dom.chances.innerHTML = this.config.chances;
        this.dom.tema.innerHTML = this.temaAtual;
        this.dom.carregarLacunas(this.palavraAtual);
        this.dom.resposta.innerHTML = this.palavraAtual;
        this.dom.carregarBotoesLetras();
    };

    this.atualizarBotaoLetra = (acerto) => {
        if (acerto) {
            this.dom.botoesLetras[this.letraAtual.index].style.backgroundColor = 'green';
        } else {
            this.dom.botoesLetras[this.letraAtual.index].style.backgroundColor = 'red';
        }
        this.dom.botoesLetras[this.letraAtual.index].disabled = true;
    };

    this.bloquearLetras = (sts) => {
        for (const i in this.dom.botoesLetras) {
            this.dom.botoesLetras[i].disabled = sts;
        }
    };

    this.mostrarResposta = (sts) => {
        if (sts) {
            this.dom.resposta.style.visibility = 'visible';
        } else {
            this.dom.resposta.style.visibility = 'hidden';
        }
    };

    this.verificarFimDeJogo = () => {
        if (this.config.chances <= 0) {
            alert('Game Over');
            this.bloquearLetras(true);
            this.mostrarResposta(true);
        } else {
            let faltaLetra = false;
            for (const i in this.palavraAtual) {
                let caractereAtual = document.querySelector(`.letra${i}`).innerHTML;
                if ( caractereAtual == '_' ) {
                    faltaLetra = true;
                    break;
                }
            }
            if (!faltaLetra) {
                alert('Você venceu!');
                this.bloquearLetras(true);
            }
        }
    };

    this.contabilizarErros = () => {
        this.config.chances--;
        this.dom.chances.innerHTML = this.config.chances;
    };

    this.tratarPalavra = (palavra) => {
        palavra = palavra.replace('Ã','A');
        palavra = palavra.replace('Á','A');
        palavra = palavra.replace('À','A');
        palavra = palavra.replace('Â','A');
        palavra = palavra.replace('É','E');
        palavra = palavra.replace('È','E');
        palavra = palavra.replace('Ê','E');
        palavra = palavra.replace('Í','I');
        palavra = palavra.replace('Ì','I');
        palavra = palavra.replace('Ó','O');
        palavra = palavra.replace('Ò','O');
        palavra = palavra.replace('Õ','O');
        palavra = palavra.replace('Ô','O');
        palavra = palavra.replace('Ú','U');
        palavra = palavra.replace('Ù','U');
        palavra = palavra.replace('Ü','U');
        palavra = palavra.replace('Ñ','N');
        palavra = palavra.replace('Ç','C');
        return palavra;
    };

    this.verificarLetra = () => {
        let temEssaLetra = false;
        let palavraTratada = this.tratarPalavra(this.palavraAtual);
        for (const i in this.palavraAtual) {
            if (this.letraAtual.name == palavraTratada.charAt(i) ) {
                temEssaLetra = true;
                document.querySelector(`.letra${i}`).innerHTML = this.palavraAtual.charAt(i);
            }
        }
        if (!temEssaLetra){
            this.contabilizarErros();
        }
        this.atualizarBotaoLetra(temEssaLetra);
    };
    
    this.jogar = (btn, index) => {
        this.letraAtual.index = index;
        this.letraAtual.name = btn.innerText;
        this.verificarLetra();
        this.verificarFimDeJogo();
    };
    
    this.start = () => {
        console.log('Tema: ' + this.temaAtual);
        console.log('Palavra: ' + this.palavraAtual);

        this.carregarElementosNaTela();

        this.dom.botoesLetras = document.querySelectorAll('.btn-letra');
        for (let i = 0; i < this.dom.botoesLetras.length; i++) {
            this.dom.botoesLetras[i].addEventListener("click", () => {
                this.jogar(this.dom.botoesLetras[i],i);
            });
        }
    };
}

axios('http://localhost:8080/GeradorDePalavras/rest/palavra')
.then(response => {
    const palavra = {
        theme: response.data.theme,
        word: response.data.word
    };
    new Jogo(palavra).start();
})
.catch(error => {
    document.querySelector('body').innerHTML = '<p>Não foi possível carregar uma palavra.</p>';
});