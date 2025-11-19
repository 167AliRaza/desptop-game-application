class AI {
    constructor(playerSymbol) {
        this.player = playerSymbol;
        this.opponent = playerSymbol === 'X' ? 'O' : 'X';
    }

    getBestMove(board) {
        let bestScore = -Infinity;
        let move = -1;

        // Optimization: If board is empty, pick center
        const emptySpots = board.reduce((acc, val, idx) => val === null ? acc.concat(idx) : acc, []);
        if (emptySpots.length === 9) return 4;

        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = this.player;
                let score = this.minimax(board, 0, false);
                board[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }

    minimax(board, depth, isMaximizing) {
        let result = this.checkWinner(board);
        if (result !== null) {
            if (result === 10) return 10 - depth;
            if (result === -10) return -10 + depth;
            return 0;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = this.player;
                    let score = this.minimax(board, depth + 1, false);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = this.opponent;
                    let score = this.minimax(board, depth + 1, true);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    checkWinner(board) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                if (board[a] === this.player) return 10;
                else if (board[a] === this.opponent) return -10;
            }
        }

        if (board.every(cell => cell !== null)) return 0;
        return null;
    }
}

module.exports = AI;
