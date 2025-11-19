class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.winner = null;
        this.isGameOver = false;
        this.winningCombo = null;
    }

    reset() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.winner = null;
        this.isGameOver = false;
        this.winningCombo = null;
    }

    makeMove(index) {
        if (this.board[index] || this.isGameOver) return false;

        this.board[index] = this.currentPlayer;
        if (this.checkWin()) {
            this.winner = this.currentPlayer;
            this.isGameOver = true;
        } else if (this.board.every(cell => cell !== null)) {
            this.isGameOver = true; // Draw
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
        return true;
    }

    checkWin() {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winningCombo = line;
                return true;
            }
        }
        return false;
    }

    getBoard() {
        return [...this.board];
    }
}

module.exports = TicTacToe;
