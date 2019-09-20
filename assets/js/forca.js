function Dom() {
    this.tema = document.querySelector('#tema');
    this.palavra = document.querySelector("#palavra");

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
}

function Configuracoes() {
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
        this.dom.tema.innerHTML = this.palavraAtual.tema.name;
        this.dom.carregarLacunas(this.palavraAtual.name);
    };
    
    this.start = () => {
        console.log('Tema: ' + this.palavraAtual.tema.name);
        console.log('Palavra: ' + this.palavraAtual.name);

        this.carregarElementosNaTela();
    };
}

new Jogo().start();