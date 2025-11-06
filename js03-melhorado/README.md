# Jogo de Adivinhar o Número - Versão Aprimorada

Este projeto é uma versão melhorada de um simples jogo de "Adivinhar o Número", desenvolvido com HTML, CSS e JavaScript puros. O objetivo foi modernizar o design, melhorar a experiência do usuário e adicionar novas funcionalidades para tornar o jogo mais interessante e rejogável.

---

## ✨ Melhorias Realizadas

As melhorias foram divididas em três áreas principais: Design (UI/UX), Funcionalidades e Estrutura do Código.

### 🎨 Design e UI (Interface do Usuário)

-   **Layout Moderno:** O layout foi refeito para um design de "cartão" (card design), centralizado na tela e com sombra para dar profundidade.
-   **Paleta de Cores:** Foi implementada uma paleta de cores mais agradável e moderna, com um fundo em gradiente suave.
-   **Tipografia:** A fonte "Poppins" (do Google Fonts) foi adicionada para uma leitura mais clara e moderna.
-   **Responsividade:** O jogo agora é totalmente responsivo, adaptando-se a telas de computadores, tablets e celulares.
-   **Elementos Interativos:**
    -   **Botões e Input:** Os botões e o campo de entrada foram estilizados para combinar com o novo design, incluindo efeitos sutis de `hover` para melhor feedback visual.
    -   **Feedback Visual para Vidas:** Em vez de texto (`+ + +`), agora são usados ícones de coração (❤️) para representar as vidas restantes, tornando a interface mais intuitiva.
-   **Animações Sutis:**
    -   Uma leve animação de `fade-in` foi adicionada ao card do jogo ao carregar a página.
    -   Uma animação de "tremor" (shake) foi implementada no card quando o jogador erra um palpite, fornecendo um feedback imediato e divertido.

### 🚀 Funcionalidades

-   **Níveis de Dificuldade:**
    -   O jogador agora pode escolher entre três níveis de dificuldade: **Fácil** (números de 1 a 25, com 7 vidas), **Médio** (1 a 100, com 10 vidas) e **Difícil** (1 a 200, com 12 vidas).
    -   Isso aumenta a rejogabilidade e permite que o jogador se desafie.
-   **Mensagens de Feedback Claras:** As mensagens de "Muito alto", "Muito baixo" e de vitória/derrota são exibidas em uma área de destaque, com cores distintas para facilitar a identificação (verde para acerto, vermelho para erro/dica).
-   **Histórico de Palpites:** O histórico de palpites agora é exibido em uma lista numerada e com rolagem, permitindo que o jogador veja todas as suas tentativas anteriores de forma organizada.
-   **Gerenciamento de Estado do Jogo:**
    -   Os botões e o campo de palpite são desabilitados e habilitados de forma inteligente. O jogo começa com os botões de dificuldade, e só após iniciar uma partida o campo de palpite é liberado.
    -   Ao final de uma partida (vitória ou derrota), o jogador é incentivado a iniciar uma nova partida escolhendo a dificuldade novamente.

### 💻 Estrutura do Código

-   **HTML Semântico:** A estrutura do HTML foi melhorada com o uso de tags mais semânticas como `<main>` e uma organização mais lógica dos contêineres `<div>`.
-   **CSS Otimizado:**
    -   O CSS foi reescrito utilizando **Variáveis CSS** (`:root`) para cores e fontes, facilitando a manutenção e futuras alterações no tema.
    -   As classes foram nomeadas de forma mais clara e o layout foi construído com **Flexbox**, garantindo alinhamento e responsividade de forma eficiente.
-   **JavaScript Refatorado e Modular:**
    -   O código JavaScript foi completamente refatorado para ser mais legível e organizado.
    -   As responsabilidades foram divididas em funções menores e mais específicas (ex: `iniciarJogo`, `processarChute`, `atualizarUI`, etc.).
    -   Nomes de variáveis e funções foram melhorados para serem mais descritivos.
-   **Comentários Detalhados:** Todos os arquivos (HTML, CSS e JS) foram extensivamente comentados para explicar a função de cada bloco de código, facilitando o entendimento e a manutenção.

---

## 🚀 Como Jogar

1.  Abra o arquivo `index.html` em seu navegador.
2.  Escolha um nível de dificuldade: Fácil, Médio ou Difícil.
3.  O jogo irá gerar um número secreto com base na dificuldade escolhida.
4.  Digite seu palpite no campo "Seu palpite" e clique em "Chutar" ou pressione a tecla "Enter".
5.  Você receberá uma dica se o seu palpite foi muito alto ou muito baixo.
6.  Continue chutando até adivinhar o número ou até suas vidas acabarem!

---

## 🛠️ Tecnologias Utilizadas

-   **HTML5 Puro**
-   **CSS3 Puro**
-   **JavaScript Puro (ES6+)**