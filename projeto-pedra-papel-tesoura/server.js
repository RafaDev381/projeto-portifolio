const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const players = [];
let gameState = {};
let timeout;

wss.on('connection', (ws) => {
  players.push(ws);

  // Enviar mensagem de conexão
  ws.send(JSON.stringify({ type: 'info', message: 'Aguardando outro jogador...' }));

  // Quando os dois jogadores se conectam
  if (players.length === 2) {
    players.forEach((player, index) => {
      player.send(JSON.stringify({ type: 'info', message: `Jogador ${index + 1} conectado! Comece o jogo.` }));
      player.send(JSON.stringify({ type: 'player', player: `player${index + 1}` }));
    });
    startTimer(); // Iniciar o temporizador
  }

  ws.on('message', (message) => {
    clearTimeout(timeout); // Reiniciar o temporizador
    const data = JSON.parse(message);
    const { player, choice } = data;

    // Atualizar estado do jogo
    gameState[player] = choice;

    // Quando ambos os jogadores fazem suas escolhas
    if (Object.keys(gameState).length === 2) {
      const [player1, player2] = Object.keys(gameState);
      const result = getWinner(gameState[player1], gameState[player2]);

      players[0].send(
        JSON.stringify({
          type: 'result',
          result,
          yourChoice: gameState[player1],
          opponentChoice: gameState[player2],
        })
      );

      players[1].send(
        JSON.stringify({
          type: 'result',
          result: result === 'Empate' ? 'Empate' : result === 'Jogador 1' ? 'Derrota' : 'Vitória',
          yourChoice: gameState[player2],
          opponentChoice: gameState[player1],
        })
      );

      // Reiniciar estado do jogo
      gameState = {};
      startTimer();
    }
  });

  ws.on('close', () => {
    const index = players.indexOf(ws);
    if (index > -1) {
      players.splice(index, 1);
    }
    gameState = {};
    if (players.length > 0) {
      players[0].send(JSON.stringify({ type: 'info', message: 'O outro jogador se desconectou. Aguardando novo jogador...' }));
    }
    clearTimeout(timeout); // Parar o temporizador
  });
});

// Função para decidir o vencedor
function getWinner(choice1, choice2) {
  if (choice1 === choice2) return 'Empate';
  if (
    (choice1 === 'pedra' && choice2 === 'tesoura') ||
    (choice1 === 'tesoura' && choice2 === 'papel') ||
    (choice1 === 'papel' && choice2 === 'pedra')
  ) {
    return 'Jogador 1';
  }
  return 'Jogador 2';
}

// Função para gerenciar temporizador
function startTimer() {
  timeout = setTimeout(() => {
    players.forEach((player) =>
      player.send(
        JSON.stringify({
          type: 'info',
          message: 'Tempo esgotado! Jogo reiniciado.',
        })
      )
    );
    gameState = {};
  }, 15000); // 15 segundos
}
