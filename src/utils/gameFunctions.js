import { winningPatterns } from "./constans";

// Utility to check the winner
const checkWinner = (tiles) => {
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
            return tiles[a]; // Return the winner ('X' or 'O')
        }
    }
    return tiles.includes(null) ? null : 'draw'; // Return 'draw' if no moves left
};

// Minimax algorithm
const minimax = (tiles, depth, isMaximizing) => {
    const winner = checkWinner(tiles);

    // Base cases
    if (winner === 'O') return 10 - depth;  // AI wins
    if (winner === 'X') return depth - 10;  // Player wins
    if (winner === 'draw') return 0;        // Draw

    if (isMaximizing) {
        let maxEval = -Infinity;

        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i] === null) {
                tiles[i] = 'O'; // AI makes a move
                const evaluation = minimax(tiles, depth + 1, false);
                tiles[i] = null; // Undo move
                maxEval = Math.max(maxEval, evaluation);
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;

        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i] === null) {
                tiles[i] = 'X'; // Player makes a move
                const evaluation = minimax(tiles, depth + 1, true);
                tiles[i] = null; // Undo move
                minEval = Math.min(minEval, evaluation);
            }
        }
        return minEval;
    }
};

// AI move using Minimax
const AImove = (tiles) => {
    let bestMove = -1;
    let bestValue = -Infinity;

    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] === null) {
            tiles[i] = 'O'; // AI makes a move
            const moveValue = minimax(tiles, 0, false);
            tiles[i] = null; // Undo move

            if (moveValue > bestValue) {
                bestValue = moveValue;
                bestMove = i;
            }
        }
    }

    return bestMove;
};

export default AImove;