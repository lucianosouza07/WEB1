// ===================================================================================
// SELEÇÃO DE ELEMENTOS DO DOM (Document Object Model)
// Guardamos em constantes as referências aos elementos HTML que vamos manipular.
// ===================================================================================
const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaFinal = document.getElementById("tela-final");
const boxCategorias = document.getElementById("box-categorias");
const imagem = document.getElementById("img-menino");
const palavraEl = document.getElementById("palavra");
const boxTeclado = document.getElementById("box-teclado");
const contadorPalavrasEl = document.getElementById("contador-palavras");
const vidasRestantesEl = document.getElementById("vidas-restantes");
const mensagemEl = document.getElementById("mensagem");
const mensagemFinalEl = document.getElementById("mensagem-final");
const palavraReveladaEl = document.getElementById("palavra-revelada");
const btnJogarNovamente = document.getElementById("btn-jogar-novamente");

// ===================================================================================
// ESTADO DO JOGO
// Variáveis que controlam o estado atual do jogo.
// ===================================================================================
let todasAsPalavras; // Armazenará todas as palavras e categorias do JSON.
let palavrasDaCategoria; // Array com as palavras da categoria escolhida.
let palavraAtual; // A palavra que o jogador está tentando adivinhar.
let exibicao; // Array que mostra o progresso do jogador (ex: ['_', '_', 'A', '_']).
let vidas;
let numPalavraAtual;
const VIDAS_INICIAIS = 6;

// ===================================================================================
// FUNÇÕES PRINCIPAIS DO JOGO
// ===================================================================================

/**
 * Função inicial que carrega os dados do JSON e prepara a tela inicial.
 * É uma função assíncrona porque precisa esperar a resposta do `fetch`.
 */
async function iniciar() {
    try {
        const response = await fetch("fases.json");
        todasAsPalavras = await response.json();
        criarBotoesCategoria();
        mostrarTela("inicial");
    } catch (error) {
        console.error("Erro ao carregar o arquivo de fases:", error);
        // Exibir uma mensagem de erro para o usuário seria uma boa prática aqui.
    }
}

/**
 * Cria os botões de categoria dinamicamente com base nas chaves do JSON.
 */
function criarBotoesCategoria() {
    boxCategorias.innerHTML = ""; // Limpa categorias antigas, se houver.
    for (const categoria in todasAsPalavras) {
        const botao = document.createElement("button");
        botao.className = "btn-categoria";
        botao.textContent = categoria;
        botao.addEventListener("click", () => selecionarCategoria(categoria));
        boxCategorias.appendChild(botao);
    }
}

/**
 * Chamada quando um botão de categoria é clicado.
 * @param {string} categoria - O nome da categoria selecionada.
 */
function selecionarCategoria(categoria) {
    palavrasDaCategoria = todasAsPalavras[categoria];
    novoJogo();
}

/**
 * Prepara e inicia uma nova partida.
 */
function novoJogo() {
    numPalavraAtual = 0;
    carregarPalavra();
    mostrarTela("jogo");
}

/**
 * Carrega a próxima palavra da categoria selecionada.
 */
function carregarPalavra() {
    // Verifica se ainda há palavras na categoria.
    if (numPalavraAtual >= palavrasDaCategoria.length) {
        finalizarJogo(true); // Venceu todas as palavras da categoria.
        return;
    }

    // Reseta o estado para a nova palavra.
    vidas = VIDAS_INICIAIS;
    palavraAtual = palavrasDaCategoria[numPalavraAtual].toUpperCase();
    exibicao = Array(palavraAtual.length).fill('_');

    carregarTeclado();
    atualizarUI();
}

/**
 * Gera o teclado virtual na tela.
 */
function carregarTeclado() {
    boxTeclado.innerHTML = ""; // Limpa o teclado anterior.
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (const letra of letras) {
        const botao = document.createElement("button");
        botao.textContent = letra;
        botao.className = "tecla"; // Adiciona a classe para estilização.
        botao.addEventListener("click", () => verificarLetra(letra, botao));
        boxTeclado.appendChild(botao);
    }
}

/**
 * Verifica se a letra clicada existe na palavra atual.
 * @param {string} letra - A letra que foi clicada.
 * @param {HTMLElement} botao - O elemento do botão que foi clicado.
 */
function verificarLetra(letra, botao) {
    botao.disabled = true; // Desabilita o botão após o clique.
    let acertou = false;

    // Percorre a palavra atual para verificar se a letra existe.
    for (let i = 0; i < palavraAtual.length; i++) {
        if (palavraAtual[i] === letra) {
            exibicao[i] = letra;
            acertou = true;
        }
    }

    if (acertou) {
        botao.classList.add("correta"); // Estilo de acerto.
        mensagemEl.textContent = "Boa! Letra correta.";
    } else {
        botao.classList.add("incorreta"); // Estilo de erro.
        vidas--;
        mensagemEl.textContent = `Letra incorreta! Restam ${vidas} vidas.`;
        // Adiciona a classe 'shake' para uma animação de erro.
        imagem.classList.add("shake");
        setTimeout(() => imagem.classList.remove("shake"), 500); // Remove a classe após a animação.
    }

    atualizarUI(); // Atualiza a interface com as novas informações.
    verificarFimDeRodada(); // Verifica se a rodada (palavra) acabou.
}

/**
 * Verifica se o jogador ganhou (acertou a palavra) ou perdeu (acabaram as vidas).
 */
function verificarFimDeRodada() {
    // Se não há mais traços na exibição, o jogador acertou a palavra.
    if (!exibicao.includes("_")) {
        mensagemEl.textContent = `🎉 Parabéns! A palavra era ${palavraAtual}.`;
        numPalavraAtual++;
        desativarTeclado();
        setTimeout(carregarPalavra, 2000); // Espera 2 segundos e carrega a próxima palavra.
    }
    // Se as vidas chegaram a zero, o jogador perdeu.
    else if (vidas === 0) {
        finalizarJogo(false);
    }
}

/**
 * Finaliza o jogo, seja por vitória ou derrota.
 * @param {boolean} venceu - `true` se o jogador venceu, `false` se perdeu.
 */
function finalizarJogo(venceu) {
    desativarTeclado();
    if (venceu) {
        mensagemFinalEl.textContent = "🏆 VOCÊ VENCEU! 🏆";
        palavraReveladaEl.textContent = "Você adivinhou todas as palavras da categoria!";
    } else {
        mensagemFinalEl.textContent = "😢 FIM DE JOGO 😢";
        palavraReveladaEl.textContent = `A palavra era: ${palavraAtual}`;
    }
    mostrarTela("final");
}

// ===================================================================================
// FUNÇÕES AUXILIARES E DE UI (User Interface)
// ===================================================================================

/**
 * Controla qual tela é exibida para o jogador.
 * @param {'inicial' | 'jogo' | 'final'} nomeTela - O nome da tela a ser exibida.
 */
function mostrarTela(nomeTela) {
    telaInicial.classList.remove("ativa");
    telaJogo.classList.remove("ativa");
    telaFinal.classList.remove("ativa");

    if (nomeTela === "inicial") telaInicial.classList.add("ativa");
    else if (nomeTela === "jogo") telaJogo.classList.add("ativa");
    else if (nomeTela === "final") telaFinal.classList.add("ativa");
}

/**
 * Atualiza todos os elementos visuais da tela de jogo.
 */
function atualizarUI() {
    palavraEl.textContent = exibicao.join(" ");
    imagem.src = `assets/menino${7 - vidas}.png`;
    contadorPalavrasEl.textContent = `Palavra ${numPalavraAtual + 1} / ${palavrasDaCategoria.length}`;
    // Exibe corações para representar as vidas.
    vidasRestantesEl.textContent = "Vidas: " + "❤️".repeat(vidas) + "🖤".repeat(VIDAS_INICIAIS - vidas);
}

/**
 * Desativa todos os botões do teclado para impedir mais jogadas.
 */
function desativarTeclado() {
    const botoes = document.querySelectorAll("#box-teclado .tecla");
    botoes.forEach(botao => botao.disabled = true);
}


// ===================================================================================
// LISTENERS DE EVENTOS
// Adiciona os "ouvintes" para eventos de clique.
// ===================================================================================

// O evento 'DOMContentLoaded' garante que o script só rode após o HTML ser totalmente carregado.
document.addEventListener("DOMContentLoaded", iniciar);

// Evento para o botão "Jogar Novamente" na tela final.
btnJogarNovamente.addEventListener("click", () => {
    // Volta para a tela inicial para escolher uma nova categoria.
    mostrarTela("inicial");
});