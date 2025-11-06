# Jogo Adivinhe a Palavra - Versão Melhorada

Este projeto é uma versão aprimorada de um jogo simples de forca/adivinhação de palavras, desenvolvido utilizando apenas HTML, CSS e JavaScript puros. As melhorias focaram em design, experiência do usuário (UX), funcionalidades e organização do código.

## 🚀 Alterações e Melhorias Implementadas

### 🎨 Design e Experiência do Usuário (UI/UX)

1.  **Interface Moderna e Responsiva:**
    *   A antiga paleta de cores (bege/marrom) foi substituída por um design mais moderno e agradável, com um tema escuro e cores de destaque vibrantes.
    *   A interface agora é totalmente responsiva, adaptando-se a telas de diferentes tamanhos, como celulares e tablets.
    *   Foi utilizada a fonte "Poppins" do Google Fonts para uma tipografia mais elegante.

2.  **Telas de Jogo:**
    *   O fluxo do jogo foi dividido em três telas distintas para uma melhor organização:
        *   **Tela Inicial:** Onde o jogador escolhe uma categoria de palavras para jogar.
        *   **Tela de Jogo:** A tela principal onde a adivinhação acontece.
        *   **Tela Final (Modal):** Um pop-up que aparece ao final do jogo (vitória ou derrota) com a mensagem e um botão para jogar novamente.

3.  **Feedback Visual Aprimorado:**
    *   **Alertas Removidos:** Os `alert()` do JavaScript, que são intrusivos, foram substituídos por mensagens integradas na própria interface, proporcionando uma experiência mais fluida.
    *   **Feedback nas Teclas:** O teclado virtual agora dá feedback visual imediato: as teclas ficam verdes para acertos e vermelhas para erros.
    *   **Animações Sutis:** Foram adicionadas pequenas animações em CSS para dar vida à interface, como o surgimento suave das telas e um efeito de "tremor" na imagem do boneco ao errar uma letra.

4.  **Acessibilidade:**
    *   O antigo botão "Iniciar", que era uma imagem, foi substituído por uma tag `<button>` HTML, que é semanticamente correta e mais acessível.

### ⚙️ Funcionalidades

1.  **Seleção de Categorias:**
    *   O arquivo `fases.json` foi reestruturado para suportar múltiplas categorias (ex: "Frutas", "Animais", "Objetos").
    *   A tela inicial agora carrega dinamicamente as categorias disponíveis do JSON, permitindo que o jogador escolha com qual tema deseja jogar.

2.  **Lógica de Jogo Aprimorada:**
    *   **Fim de Jogo Completo:** A lógica agora detecta quando o jogador adivinhou todas as palavras de uma categoria, exibindo uma mensagem de vitória geral.
    *   **Botão "Jogar Novamente":** Ao final de cada partida (vitória ou derrota), um botão "Jogar Novamente" é exibido, permitindo reiniciar o jogo de forma prática, retornando à tela de seleção de categorias.

3.  **Exibição de Status:**
    *   A interface agora mostra informações úteis durante o jogo, como o número de vidas restantes e qual palavra o jogador está adivinhando (ex: "Palavra 2 de 10").

### 💻 Código e Estrutura

1.  **Código Totalmente Comentado:**
    *   Todos os arquivos (`.html`, `.css`, `.js`) foram comentados em português do Brasil, explicando a função de cada bloco de código, facilitando a manutenção e o aprendizado.

2.  **JavaScript Refatorado:**
    *   O código JavaScript foi reorganizado para uma melhor legibilidade, separando:
        *   Seleção de elementos do DOM.
        *   Variáveis de estado do jogo.
        *   Funções principais da lógica do jogo.
        *   Listeners de eventos.
    *   Foram criadas novas funções para modularizar o código, como `atualizarUI`, `mostrarTela` e `finalizarJogo`.

3.  **CSS Moderno:**
    *   O CSS foi reescrito utilizando variáveis (`:root`) para facilitar a alteração de temas e cores.
    *   O layout foi construído com Flexbox para garantir alinhamento e responsividade de forma eficiente.

## Como Executar

1.  Certifique-se de que todos os arquivos (`index.html`, `estilo.css`, `interacao.js`, `fases.json`) e a pasta `assets` estejam no mesmo diretório.
2.  Abra o arquivo `index.html` em qualquer navegador web moderno.

Este projeto agora oferece uma experiência de jogo muito mais completa, moderna e agradável, mantendo a simplicidade da tecnologia base (HTML, CSS e JS puros).