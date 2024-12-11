document.addEventListener('DOMContentLoaded', () => {
    const players = document.querySelectorAll('.player');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const choicesDisplay = document.getElementById('choices-display');
    const resetBtn = document.getElementById('reset-btn');

    let player1Choice = null;
    let player2Choice = null;

    const choices = ['rock', 'paper', 'scissors'];
    const emojis = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️'
    };

    function determineWinner(p1, p2) {
        if (p1 === p2) return 'Empate!';
        const winningCombos = {
            rock: 'scissors',
            scissors: 'paper',
            paper: 'rock'
        };
        return winningCombos[p1] === p2 ? 'Player 1 venceu!' : 'Player 2 venceu!';
    }

    players.forEach((player, playerIndex) => {
        const choiceButtons = player.querySelectorAll('.choice');
        choiceButtons.forEach(button => {
            button.addEventListener('click', () => {
          
                choiceButtons.forEach(btn => btn.classList.remove('selected'));
                
          
                button.classList.add('selected');

          
                if (playerIndex === 0) {
                    player1Choice = button.dataset.choice;
                } else {
                    player2Choice = button.dataset.choice;
                }

              
                if (player1Choice && player2Choice) {
                    showResult();
                }
            });
        });
    });

    function showResult() {
        const result = determineWinner(player1Choice, player2Choice);
        resultText.textContent = result;
        
      
        choicesDisplay.innerHTML = `
            <div>
                <span>Player 1</span>
                <div>${emojis[player1Choice]}</div>
            </div>
            <div>
                <span>Player 2</span>
                <div>${emojis[player2Choice]}</div>
            </div>
        `;

        
        resultContainer.classList.remove('hidden');
    }

    resetBtn.addEventListener('click', () => {
       
        player1Choice = null;
        player2Choice = null;

      
        players.forEach(player => {
            player.querySelectorAll('.choice').forEach(btn => {
                btn.classList.remove('selected');
            });
        });

        // Hide result container
        resultContainer.classList.add('hidden');
    });
});