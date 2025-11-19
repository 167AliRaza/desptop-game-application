const TicTacToe = require('./game');
const AI = require('./ai');

const game = new TicTacToe();
const ai = new AI('O'); // AI plays as O

const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const modePvpBtn = document.getElementById('mode-pvp');
const modeAiBtn = document.getElementById('mode-ai');

let isAiMode = false;
let isAiTurn = false;

function updateUI() {
    const board = game.getBoard();
    cells.forEach((cell, index) => {
        cell.textContent = board[index] || '';
        cell.className = 'cell';
        if (board[index] === 'X') cell.classList.add('x');
        if (board[index] === 'O') cell.classList.add('o');
    });

    if (game.winningCombo) {
        game.winningCombo.forEach(index => {
            cells[index].classList.add('winner');
        });
    }

    if (game.isGameOver) {
        if (game.winner) {
            statusElement.textContent = `Player ${game.winner} Wins!`;
        } else {
            statusElement.textContent = "It's a Draw!";
        }
    } else {
        if (isAiMode && game.currentPlayer === 'O') {
            statusElement.textContent = "AI is thinking...";
        } else {
            statusElement.textContent = `Player ${game.currentPlayer}'s Turn`;
        }
    }
}

function handleCellClick(e) {
    if (game.isGameOver || (isAiMode && isAiTurn)) return;

    const index = parseInt(e.target.getAttribute('data-index'));

    if (game.makeMove(index)) {
        updateUI();

        if (!game.isGameOver && isAiMode && game.currentPlayer === 'O') {
            isAiTurn = true;
            setTimeout(makeAiMove, 500); // Small delay for realism
        }
    }
}

function makeAiMove() {
    const bestMove = ai.getBestMove(game.getBoard());
    if (bestMove !== -1) {
        game.makeMove(bestMove);
        updateUI();
    }
    isAiTurn = false;
}

function resetGame() {
    game.reset();
    isAiTurn = false;
    updateUI();
}

function setMode(mode) {
    isAiMode = mode === 'ai';
    modePvpBtn.classList.toggle('active', !isAiMode);
    modeAiBtn.classList.toggle('active', isAiMode);
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
modePvpBtn.addEventListener('click', () => setMode('pvp'));
modeAiBtn.addEventListener('click', () => setMode('ai'));

updateUI();
