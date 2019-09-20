function Dom() {
    this.chances = document.querySelector('#chances');
    this.tema = document.querySelector('#tema');
    this.palavra = document.querySelector("#palavra");
    this.resposta = document.querySelector('#resposta');
    this.letras = document.querySelector("#letras");
    // this.botoesLetras;

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

function Jogo() {
    this.dom = new Dom();
    this.config = new Configuracoes();
    this.palavraAtual = new Palavra(this.config.dicionario);

    this.carregarElementosNaTela = () => {
        this.dom.chances.innerHTML = this.config.chances;
        this.dom.tema.innerHTML = this.palavraAtual.tema.name;
        this.dom.carregarLacunas(this.palavraAtual.name);
        this.dom.resposta.innerHTML = this.palavraAtual.name;
        this.dom.carregarBotoesLetras();
    };
    
    this.start = () => {
        console.log('Tema: ' + this.palavraAtual.tema.name);
        console.log('Palavra: ' + this.palavraAtual.name);

        this.carregarElementosNaTela();
    };
}

new Jogo().start();