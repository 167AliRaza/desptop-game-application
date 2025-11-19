const TicTacToe = require('./game');
const AI = require('./ai');

// Game State
let gameMode = null; // 'single' or 'two'
let player1Name = 'Player 1';
let player2Name = 'Player 2';
let difficulty = 'medium';
let game = null;
let ai = null;
let isAiTurn = false;
let scores = { player1: 0, player2: 0 };

// Screen Elements
const modeScreen = document.getElementById('mode-screen');
const setupScreen = document.getElementById('setup-screen');
const gameScreen = document.getElementById('game-screen');
const resultModal = document.getElementById('result-modal');

// Mode Screen Buttons
const btnSinglePlayer = document.getElementById('btn-single-player');
const btnTwoPlayer = document.getElementById('btn-two-player');

// Setup Screen Elements
const setupTitle = document.getElementById('setup-title');
const player1Input = document.getElementById('player1-name');
const player2Input = document.getElementById('player2-name');
const player2Group = document.getElementById('player2-group');
const difficultyGroup = document.getElementById('difficulty-group');
const diffButtons = document.querySelectorAll('.diff-btn');
const btnBackToMode = document.getElementById('btn-back-to-mode');
const btnStartGame = document.getElementById('btn-start-game');

// Game Screen Elements
const player1Info = document.getElementById('player1-info');
const player2Info = document.getElementById('player2-info');
const scoreDisplay = document.getElementById('score-display');
const statusElement = document.getElementById('status');
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const btnHome = document.getElementById('btn-home');
const btnReset = document.getElementById('btn-reset');

// Result Modal Elements
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const resultAnimation = document.getElementById('result-animation');
const btnModalHome = document.getElementById('btn-modal-home');
const btnPlayAgain = document.getElementById('btn-play-again');

// Mode Selection
btnSinglePlayer.addEventListener('click', () => {
    gameMode = 'single';
    showSetupScreen();
});

btnTwoPlayer.addEventListener('click', () => {
    gameMode = 'two';
    showSetupScreen();
});

// Setup Screen
function showSetupScreen() {
    modeScreen.style.display = 'none';
    setupScreen.style.display = 'flex';

    if (gameMode === 'single') {
        setupTitle.textContent = 'Single Player Setup';
        player2Group.style.display = 'none';
        difficultyGroup.style.display = 'block';
        player2Input.value = 'AI';
    } else {
        setupTitle.textContent = 'Two Player Setup';
        player2Group.style.display = 'block';
        difficultyGroup.style.display = 'none';
    }

    player1Input.value = '';
    player2Input.value = '';
    player1Input.focus();
}

// Difficulty Selection
diffButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        diffButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        difficulty = btn.dataset.difficulty;
    });
});

btnBackToMode.addEventListener('click', () => {
    setupScreen.style.display = 'none';
    modeScreen.style.display = 'flex';
});

btnStartGame.addEventListener('click', () => {
    player1Name = player1Input.value.trim() || 'Player 1';
    player2Name = gameMode === 'single' ? 'AI' : (player2Input.value.trim() || 'Player 2');

    startGame();
});

// Game Functions
function startGame() {
    setupScreen.style.display = 'none';
    gameScreen.style.display = 'flex';

    game = new TicTacToe();
    if (gameMode === 'single') {
        ai = new AI('O', difficulty);
    }

    player1Info.textContent = `${player1Name} (X)`;
    player2Info.textContent = `${player2Name} (O)`;
    updateScoreDisplay();
    updateUI();
}

function updateUI() {
    const boardState = game.getBoard();
    cells.forEach((cell, index) => {
        cell.textContent = boardState[index] || '';
        cell.className = 'cell';
        if (boardState[index] === 'X') cell.classList.add('x');
        if (boardState[index] === 'O') cell.classList.add('o');
    });

    if (game.winningCombo) {
        game.winningCombo.forEach(index => {
            cells[index].classList.add('winner');
        });
    }

    if (game.isGameOver) {
        if (game.winner) {
            const winnerName = game.winner === 'X' ? player1Name : player2Name;
            statusElement.textContent = `${winnerName} Wins!`;

            // Update scores
            if (game.winner === 'X') {
                scores.player1++;
            } else {
                scores.player2++;
            }
            updateScoreDisplay();

            // Show result modal after a delay
            setTimeout(() => showResultModal(game.winner), 1000);
        } else {
            statusElement.textContent = "It's a Draw!";
            setTimeout(() => showResultModal(null), 1000);
        }
    } else {
        const currentPlayerName = game.currentPlayer === 'X' ? player1Name : player2Name;
        if (gameMode === 'single' && game.currentPlayer === 'O') {
            statusElement.textContent = 'AI is thinking...';
        } else {
            statusElement.textContent = `${currentPlayerName}'s Turn`;
        }
    }
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `${scores.player1} - ${scores.player2}`;
}

function handleCellClick(e) {
    if (game.isGameOver || (gameMode === 'single' && isAiTurn)) return;

    const index = parseInt(e.target.getAttribute('data-index'));

    if (game.makeMove(index)) {
        playMoveSound();
        updateUI();

        if (!game.isGameOver && gameMode === 'single' && game.currentPlayer === 'O') {
            isAiTurn = true;
            setTimeout(makeAiMove, 500);
        }
    }
}

function makeAiMove() {
    const bestMove = ai.getMove(game.getBoard());
    if (bestMove !== -1) {
        game.makeMove(bestMove);
        playMoveSound();
        updateUI();
    }
    isAiTurn = false;
}

function resetGame() {
    game.reset();
    isAiTurn = false;
    updateUI();
}

function goHome() {
    gameScreen.style.display = 'none';
    resultModal.style.display = 'none';
    modeScreen.style.display = 'flex';
    scores = { player1: 0, player2: 0 };
}

// Result Modal
function showResultModal(winner) {
    const isWin = winner !== null;
    const isPlayer1Win = winner === 'X';

    if (isWin) {
        const winnerName = isPlayer1Win ? player1Name : player2Name;
        resultTitle.textContent = isPlayer1Win || gameMode === 'two' ? '🎉 Victory!' : '😔 Defeat!';
        resultMessage.textContent = `${winnerName} Wins!`;
        resultAnimation.className = 'result-animation victory';
        createConfetti();
        playVictorySound();
    } else {
        resultTitle.textContent = '🤝 Draw!';
        resultMessage.textContent = "It's a tie!";
        resultAnimation.className = 'result-animation draw';
        playDrawSound();
    }

    resultModal.style.display = 'flex';
}

function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.innerHTML = '';

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = ['#00e5ff', '#ff4081', '#ffeb3b', '#4caf50'][Math.floor(Math.random() * 4)];
        confettiContainer.appendChild(confetti);
    }
}

// Sound Effects
function playMoveSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 400;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (err) {
        console.log('Sound failed:', err);
    }
}

function playVictorySound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;

        [0, 0.15, 0.3].forEach((delay, i) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 523 + (i * 100);
            gainNode.gain.setValueAtTime(0.2, now + delay);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.3);

            oscillator.start(now + delay);
            oscillator.stop(now + delay + 0.3);
        });
    } catch (err) {
        console.log('Sound failed:', err);
    }
}

function playDrawSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 300;
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (err) {
        console.log('Sound failed:', err);
    }
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
btnReset.addEventListener('click', resetGame);
btnHome.addEventListener('click', goHome);
btnModalHome.addEventListener('click', goHome);
btnPlayAgain.addEventListener('click', () => {
    resultModal.style.display = 'none';
    resetGame();
});
