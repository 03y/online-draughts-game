// This is the draughts game object.
// It stores the game ID, the player IDs, and the game state.

// The game state is a 2D array of integers.
// 0 means the square is empty.
// 1 means the square is occupied by a player 1 piece.
// 2 means the square is occupied by a player 2 piece.

import Move from './move.js';

class Game {
    constructor(id, player1, player2) {
        this.id = id;
        this.player1 = player1;
        this.player2 = player2;
        this.state = [
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0]
        ];
        this.turn = 0;
        this.lastMove = null;
    }

    get getId() {
        return this.id;
    }

    get getPlayers() {
        return [this.player1, this.player2];
    }

    get getState() {
        return this.state;
    }

    get getWinner() {
        let player1 = false;
        let player2 = false;
        for (let row of this.state) {
            for (let square of row) {
                if (square === 1) {
                    player1 = true;
                } else if (square === 2) {
                    player2 = true;
                }
            }
        }
        if (player1 && player2) {
            return null;
        } else if (player1) {
            return 1;
        } else if (player2) {
            return 2;
        } else {
            return 0;
        }
    }

    // TODO: Handle all possible directions
    // TODO: Fix hop logic & handle multiple hops
    getMoves() {
        let moves = [];
        let player = this.turn % 2 === 0 ? 1 : 2;
        for (let row = 0; row < this.state.length; row++) {
            console.log(row);
            for (let col = 0; col < this.state[row].length; col++) {
                if (this.state[row][col] === player) {
                    // Player can move diagonally forward one square.
                    // Player can move diagonally forward n squares if there are opponent pieces in between.
                    // Player can move diagonally one square in any direction if they reach the end of the board (king piece).
                    // Player can move diagonally n squares in any direction if there are opponent pieces in between (king piece).
                    
                    let oldPos = [row, col];
                    
                    // Check if player can move diagonally forward one square.
                    if (player === 1) {
                        // south east
                        if (row < 6 && col < 6) {
                            if (this.state[row + 1][col + 1] === 0) {
                                let newPos = [row + 1, col + 1];
                                let move = new Move(oldPos, newPos);
                                moves.push(move);
                            } else if (this.state[row + 1][col + 1] === 2) {    // south east hop
                                let hops;
                                for (let i = 2; i < 6; i++) {
                                    if (row + i < 8 && col + i < 8) {
                                        if (this.state[row + i][col + i] === 0) {
                                            let newPos = [row + i, col + i];
                                            let move = new Move(oldPos, newPos, hops);
                                            moves.push(move);
                                            break;
                                        } else if (this.state[row + i][col + i] === 2) {
                                            hops = [[row + i, col + i]];
                                        } else {
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        // south west
                        if (row < 6 && col > 1) {
                            if (this.state[row + 1][col - 1] === 0) {
                                let newPos = [row + 1, col - 1];
                                let move = new Move(oldPos, newPos);
                                moves.push(move);
                            }
                        }
                    } else {
                        // north west
                        if (row > 1 && col > 1) {
                            if (this.state[row - 1][col - 1] === 0) {
                                let newPos = [row - 1, col - 1];
                                let move = new Move(oldPos, newPos);
                                moves.push(move);
                            }
                        }
                        // north east
                        if (row > 1 && col < 6) {
                            if (this.state[row - 1][col + 1] === 0) {
                                let newPos = [row - 1, col + 1];
                                let move = new Move(oldPos, newPos);
                                moves.push(move);
                            }
                        }
                    }
                }
            }
        }
        return moves;
    }

    set setState(state) {
        this.state = state;
    }

    isValidMove(move) {
        for (let m of this.getMoves()) {
            if (m.equals(move)) {
                return true;
            }
        }
        return false;
    }


    move(move) {
        let player = this.turn % 2 === 0 ? 1 : 2;
        if (this.isValidMove(move)) {
            this.state[move.getNewPos[0]][move.getNewPos[1]] = player;
            this.state[move.getOldPos[0]][move.getOldPos[1]] = 0;
            if (move.getHop) {
                for (let hop of move.getHops) {
                    this.state[hop[0]][hop[1]] = 0;
                }
            }
            this.turn++;
            this.lastMove = move;
            return true;
        } else {
            return false;
        }
    }

    toString() {
        let str = '';
        for (let row = 0; row < this.state.length; row++) {
            for (let col = 0; col < this.state[row].length; col++) {
                str += this.state[row][col];
            }
            str += '\n';
        }
        return str;
    }
    
    handleBackground(black, pos) {
        const gray_background = '\u001b[100m';
        const gold_background = '\u001b[43m';
        let str = '';
        if (this.lastMove !== null && this.lastMove.getNewPos[0] === pos[0] && this.lastMove.getNewPos[1] === pos[1]) {
            str += gold_background;
        } else if (black) {
            str += gray_background;
        }
        return str;
    }

    toPrettyString() {
        const red = '\u001b[31m';
        const blue = '\u001b[34m';
        const reset = '\u001b[0m';
        const circle = '\u25cf';

        let black = false;
        let str = '';
        
        for (let row = 0; row < this.state.length; row++) {
            for (let col = 0; col < this.state[row].length; col++) {
                black = !black;
                switch (this.state[row][col]) {
                    case 0:
                        str += this.handleBackground(black, [row, col]) + '   ' + reset;
                        break;
                    case 1:
                        str += red + this.handleBackground(black, [row, col]) + ' ' + circle + ' ' + reset;
                        break;
                    case 2:
                        str += blue + this.handleBackground(black, [row, col]) + ' ' + circle + ' ' + reset;
                        break;
                    default:
                        break;
                }
            }
            black = !black;
            str += '\n';
        }
        return str;
    }
}

export default Game;
