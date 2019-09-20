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
    this.dicionario = [
        {
            "tema": "Games",
            "palavras": ["Bloodborne", "Dark Souls", "Detroit Become Human", "Naruto Shippuden"]
        },
        {
            "tema": "Filmes",
            "palavras": ["A Origem", "Ilha do Medo", "Vingadores", "Matrix"]
        }
    ];
}

function Tema(dicionario) {
    this.index = Math.floor(Math.random() * dicionario.length);
    this.name = dicionario[this.index].tema.toUpperCase();
}

function Palavra(dicionario) {
    this.tema = new Tema(dicionario);
    this.index = Math.floor(Math.random() * dicionario[this.tema.index].palavras.length);
    this.name = dicionario[this.tema.index].palavras[this.index].toUpperCase();
}

const Letra = function() {
    this.index = 0;
    this.name = '';
}

function Jogo() {
    this.dom = new Dom();
    this.config = new Configuracoes();
    this.palavraAtual = new Palavra(this.config.dicionario);
    this.letraAtual = new Letra();

    this.carregarElementosNaTela = () => {
        this.dom.chances.innerHTML = this.config.chances;
        this.dom.tema.innerHTML = this.palavraAtual.tema.name;
        this.dom.carregarLacunas(this.palavraAtual.name);
        this.dom.resposta.innerHTML = this.palavraAtual.name;
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
            // Se a palavra estiver completa, o jogo acaba também
        }
    };

    this.contabilizarErros = () => {
        this.config.chances--;
        this.dom.chances.innerHTML = this.config.chances;
    };

    this.verificarLetra = () => {
        let temEssaLetra = false;
        for (const i in this.palavraAtual.name) {
            if (this.letraAtual.name == this.palavraAtual.name.charAt(i) ) {
                temEssaLetra = true;
                document.querySelector(`.letra${i}`).innerHTML = this.letraAtual.name;
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
        console.log('Tema: ' + this.palavraAtual.tema.name);
        console.log('Palavra: ' + this.palavraAtual.name);

        this.carregarElementosNaTela();

        this.dom.botoesLetras = document.querySelectorAll('.btn-letra');
        for (let i = 0; i < this.dom.botoesLetras.length; i++) {
            this.dom.botoesLetras[i].addEventListener("click", () => {
                this.jogar(this.dom.botoesLetras[i],i);
            });
        }
    };
}

new Jogo().start();