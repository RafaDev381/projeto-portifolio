const ws = new WebSocket('ws://localhost:8080');
const resultDiv = document.querySelector('.result');
const buttons = document.querySelectorAll('.choices button');

let player;

// Receber mensagens do servidor
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'info') {
    resultDiv.textContent = data.message;
  }

  if (data.type === 'player') {
    // Identificar o jogador
    player = data.player;
  }

  if (data.type === 'result') {
    resultDiv.innerHTML = `
      <p>Sua escolha: ${data.yourChoice}</p>
      <p>Escolha do oponente: ${data.opponentChoice}</p>
      <p>Resultado: ${data.result}</p>
    `;
  }
};

// Enviar escolha para o servidor
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const choice = button.getAttribute('data-choice');
    ws.send(JSON.stringify({ player, choice }));
    resultDiv.textContent = 'Esperando pelo oponente...';
  });
});