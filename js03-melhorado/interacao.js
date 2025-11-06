// --- SELEÇÃO DOS ELEMENTOS DO DOM ---
// Armazena referências aos elementos HTML para fácil acesso e manipulação.

// Contêineres principais
const gameContainer = document.querySelector('.game-container');
const secaoDificuldade = document.getElementById('selecao-dificuldade');
const secaoJogoPrincipal = document.getElementById('jogo-principal');

// Botões
const botoesDificuldade = document.querySelectorAll('.btn-dificuldade');
const btnChutar = document.getElementById('btn-chutar');

// Entradas e Formulários
const formChute = document.getElementById('form-chute');
const inputChute = document.getElementById('input-chute');

// Displays de informação
const displayVidas = document.getElementById('vidas-display');
const mensagemFeedback = document.getElementById('mensagem-feedback');
const textoInstrucao = document.getElementById('texto-instrucao');
const listaHistorico = document.getElementById('lista-historico');

// --- VARIÁVEIS DE ESTADO DO JOGO ---
// Variáveis que controlam o estado atual do jogo.

let numeroSecreto;      // O número que o jogador precisa adivinhar.
let vidas;              // Quantidade de vidas restantes.
let limiteMaximo;       // O número máximo para o sorteio (depende da dificuldade).
let jogoAtivo = false;  // Flag para verificar se uma partida está em andamento.

// Objeto para configurar os níveis de dificuldade. Facilita adicionar ou alterar níveis.
const NIVEIS = {
    facil: { max: 25, vidas: 7 },
    medio: { max: 100, vidas: 10 },
    dificil: { max: 200, vidas: 12 }
};

// --- FUNÇÕES PRINCIPAIS DO JOGO ---

/**
 * Inicia uma nova partida com base na dificuldade escolhida.
 * @param {string} dificuldade - A chave da dificuldade ('facil', 'medio', 'dificil').
 */
function iniciarJogo(dificuldade) {
    // Configura as variáveis do jogo com base no nível selecionado.
    limiteMaximo = NIVEIS[dificuldade].max;
    vidas = NIVEIS[dificuldade].vidas;

    // Gera o número secreto. A fórmula garante um número entre 1 e limiteMaximo.
    numeroSecreto = Math.floor(Math.random() * limiteMaximo) + 1;
    
    // Define o jogo como ativo.
    jogoAtivo = true;

    // Atualiza a interface do usuário (UI) para o estado de início de jogo.
    secaoDificuldade.classList.add('hidden'); // Esconde a seleção de dificuldade.
    secaoJogoPrincipal.classList.remove('hidden'); // Mostra a área de jogo.
    
    btnChutar.disabled = false; // Habilita o botão de chutar.
    inputChute.disabled = false; // Habilita o campo de entrada.
    inputChute.value = ''; // Limpa o campo de entrada.
    listaHistorico.innerHTML = ''; // Limpa o histórico de palpites.
    
    // Atualiza os displays de vidas e a instrução.
    atualizarDisplayVidas();
    exibirMensagem(`Adivinhe um número entre 1 e ${limiteMaximo}.`, 'dica');
    textoInstrucao.textContent = `Adivinhe o número entre 1 e ${limiteMaximo}`;

    // Foca no campo de entrada para que o jogador possa digitar imediatamente.
    inputChute.focus();

    // Console.log para depuração (pode ser removido em produção).
    console.log(`Jogo iniciado! Dificuldade: ${dificuldade}. Número secreto: ${numeroSecreto}`);
}

/**
 * Processa o palpite enviado pelo jogador.
 */
function processarChute() {
    // Se o jogo não estiver ativo, não faz nada.
    if (!jogoAtivo) return;

    // Converte o valor do input para um número inteiro.
    const palpite = parseInt(inputChute.value);

    // Validação do palpite.
    if (isNaN(palpite) || palpite < 1 || palpite > limiteMaximo) {
        exibirMensagem(`Por favor, insira um número válido entre 1 e ${limiteMaximo}.`, 'erro');
        inputChute.value = ''; // Limpa o input inválido.
        return; // Encerra a função.
    }

    // Adiciona o palpite ao histórico.
    adicionarAoHistorico(palpite);

    // Compara o palpite com o número secreto.
    if (palpite === numeroSecreto) {
        // O jogador acertou.
        exibirMensagem(`Parabéns! Você acertou o número ${numeroSecreto}!`, 'sucesso');
        finalizarJogo(true); // Finaliza o jogo com vitória.
    } else {
        // O jogador errou.
        vidas--; // Decrementa uma vida.
        atualizarDisplayVidas(); // Atualiza a exibição de vidas.
        
        // Aplica a animação de "tremor" no contêiner para feedback visual.
        gameContainer.classList.add('shake');
        // Remove a classe da animação após 500ms para que possa ser reativada.
        setTimeout(() => gameContainer.classList.remove('shake'), 500);

        if (vidas > 0) {
            // Se ainda houver vidas, dá uma dica.
            const dica = palpite < numeroSecreto ? 'muito baixo' : 'muito alto';
            exibirMensagem(`Errado! Seu palpite foi ${dica}.`, 'dica');
        } else {
            // Se as vidas acabaram.
            exibirMensagem(`Fim de jogo! O número secreto era ${numeroSecreto}.`, 'erro');
            finalizarJogo(false); // Finaliza o jogo com derrota.
        }
    }

    // Limpa o campo de entrada e foca nele para o próximo palpite.
    inputChute.value = '';
    inputChute.focus();
}

/**
 * Finaliza a partida, seja por vitória ou derrota.
 * @param {boolean} vitoria - True se o jogador venceu, false caso contrário.
 */
function finalizarJogo(vitoria) {
    jogoAtivo = false; // Marca o jogo como inativo.
    btnChutar.disabled = true; // Desabilita o botão de chutar.
    inputChute.disabled = true; // Desabilita o campo de entrada.

    // Mostra novamente a seleção de dificuldade para incentivar um novo jogo.
    secaoDificuldade.classList.remove('hidden');
}


// --- FUNÇÕES AUXILIARES E DE UI ---

/**
 * Atualiza a exibição de vidas na tela usando ícones de coração.
 */
function atualizarDisplayVidas() {
    displayVidas.innerHTML = '❤️ '.repeat(vidas);
}

/**
 * Exibe uma mensagem na área de feedback e aplica uma classe de estilo.
 * @param {string} texto - A mensagem a ser exibida.
 * @param {string} tipo - O tipo da mensagem ('sucesso', 'erro', 'dica') para aplicar a classe CSS.
 */
function exibirMensagem(texto, tipo) {
    mensagemFeedback.textContent = texto;
    // Remove todas as classes de tipo antes de adicionar a nova.
    mensagemFeedback.classList.remove('sucesso', 'erro', 'dica');
    mensagemFeedback.classList.add(tipo);
}

/**
 * Adiciona um item à lista de histórico de palpites.
 * @param {number} palpite - O número que o jogador chutou.
 */
function adicionarAoHistorico(palpite) {
    const itemLista = document.createElement('li'); // Cria um novo elemento <li>.
    itemLista.textContent = `Seu palpite: ${palpite}`; // Define o texto do item.
    listaHistorico.appendChild(itemLista); // Adiciona o item à lista.
    // Rolagem automática para o final da lista para mostrar o último palpite.
    listaHistorico.scrollTop = listaHistorico.scrollHeight;
}


// --- EVENT LISTENERS (Ouvintes de Eventos) ---

// Adiciona um ouvinte de evento para cada botão de dificuldade.
botoesDificuldade.forEach(botao => {
    botao.addEventListener('click', () => {
        // Pega o valor do atributo 'data-dificuldade' do botão clicado.
        const dificuldade = botao.dataset.dificuldade;
        iniciarJogo(dificuldade);
    });
});

// Adiciona um ouvinte para o evento de 'submit' do formulário.
// Isso captura tanto o clique no botão "Chutar" quanto o pressionar da tecla "Enter".
formChute.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página).
    processarChute(); // Chama a função que processa o palpite.
});