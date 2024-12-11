// Seleção dos elementos
const cartas = document.querySelectorAll('.carta');
const mensagem = document.getElementById('mensagem');
const contadorTentativas = document.getElementById('tentativas');
const botaoReiniciar = document.getElementById('botaoReiniciar');

// Array com as imagens dos pares
const imagensPares = [
    'braco-direito-exodia.jpg',
    'braco-direito-exodia.jpg',
    'exodia.jpg',
    'exodia.jpg',
    'perna-esquerda-exodia.jpg',
    'perna-esquerda-exodia.jpg'
];

// Variáveis de controle do jogo
let cartasViradas = [];
let paresEncontrados = [];
let bloqueado = false;
let tentativas = 0;

// Função para embaralhar array
function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para inicializar o jogo
function iniciarJogo() {
    const imagensEmbaralhadas = embaralharArray([...imagensPares]);
    cartas.forEach((carta, index) => {
        carta.style.backgroundImage = 'url(carta-virada.jpg)'; // Imagem do verso da carta
        carta.classList.remove('flip');
        carta.dataset.imagem = imagensEmbaralhadas[index];
    });
    
    cartasViradas = [];
    paresEncontrados = [];
    bloqueado = false;
    tentativas = 0;
    contadorTentativas.textContent = tentativas;
    mensagem.textContent = 'Encontre todos os pares!';
    
    // Carregar histórico do localStorage
    atualizarHistorico();
}

// Função para virar carta
function virarCarta() {
    if (bloqueado) return;
    if (this === cartasViradas[0]) return;

    this.classList.add('flip');
    this.style.backgroundImage = `url(${this.dataset.imagem})`;

    cartasViradas.push(this);

    if (cartasViradas.length === 2) {
        bloqueado = true;
        verificarPar();
    }
}

// Função para verificar par
function verificarPar() {
    tentativas++;
    contadorTentativas.textContent = tentativas;

    const [carta1, carta2] = cartasViradas;
    const match = carta1.dataset.imagem === carta2.dataset.imagem;

    if (match) {
        paresEncontrados.push(carta1.dataset.imagem);
        cartasViradas = [];
        bloqueado = false;

        if (paresEncontrados.length === imagensPares.length / 2) {
            setTimeout(() => {
                mensagem.textContent = 'PARABÉNS! Você encontrou todos os pares!';
                salvarTentativa(tentativas);
            }, 500);
        }
    } else {
        setTimeout(() => {
            carta1.classList.remove('flip');
            carta2.classList.remove('flip');
            carta1.style.backgroundImage = 'url(carta-virada.jpg)';
            carta2.style.backgroundImage = 'url(carta-virada.jpg)';
            cartasViradas = [];
            bloqueado = false;
        }, 1000);
    }
}

// Função para salvar tentativa no localStorage
function salvarTentativa(numeroTentativas) {
    let historico = JSON.parse(localStorage.getItem('historicoJogoMemoria') || '[]');
    historico.push(numeroTentativas);
    localStorage.setItem('historicoJogoMemoria', JSON.stringify(historico));
    atualizarHistorico();
}

// Função para atualizar o histórico na interface
function atualizarHistorico() {
    const historico = JSON.parse(localStorage.getItem('historicoJogoMemoria') || '[]');
    // Verifica se já existe uma div de histórico, se não, cria uma
    let historicoDiv = document.querySelector('.historico');
    if (!historicoDiv) {
        historicoDiv = document.createElement('div');
        historicoDiv.className = 'historico';
        document.querySelector('.informacoes').appendChild(historicoDiv);
    }
    
    historicoDiv.innerHTML = '<h3>Histórico de Tentativas:</h3>';
    historico.forEach((tentativa, index) => {
        historicoDiv.innerHTML += `<p>Jogo ${index + 1}: ${tentativa} tentativas</p>`;
    });
}

// Event Listeners
cartas.forEach(carta => carta.addEventListener('click', virarCarta));
botaoReiniciar.addEventListener('click', iniciarJogo);

// Iniciar jogo quando a página carregar
iniciarJogo();