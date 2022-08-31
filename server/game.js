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

    getMoves() {
        let moves = [];
        let player = this.turn % 2 === 0 ? 1 : 2;
        for (let row = 0; row < this.state.length; row++) {
            for (let col = 0; col < this.state[row].length; col++) {
                if (this.state[row][col] === player) {
                    // Player can move diagonally by n spaces if the other player is diagonal and there is a free space
                    // Eg if player A is at 1,1 and player B is at 2,2 and 3,3
                    // then player A can move to 4,4 and player B's peices are removed.

                    // North East
                    if (row - 1 >= 0 && col + 1 < this.state[row].length) { // Check that position is in bounds
                        if (this.state[row + 1][col - 1] != player && this.state[row + 1][col - 1] != 0
                            && this.state[row + 2][col - 2] === 0) {
                                moves.push(new Move([row, col], [row + 2][col - 2]));
                        }
                    }

                    // North West
                    if (row - 1 >= 0 && col - 1 >= 0) { // Check that position is in bounds
                        if (this.state[row - 1][col - 1] != player && this.state[row - 1][col - 1] != 0 
                            && this.state[row - 2][col - 2] === 0) {
                                moves.push(new Move([row, col], [row - 2, col - 2]));
                        }


                    // South East
                    if (row + 1 < this.state.length && col + 1 < this.state[row].length) { // Check that position is in bounds
                        if (this.state[row + 1][col + 1] != player && this.state[row + 1][col + 1] != 0
                            && this.state[row + 2][col + 2] === 0) {
                                moves.push(new Move([row, col], [row + 2, col + 2]));
                            }
                    }

                    // South West
                    if (row + 1 < this.state.length && col - 1 >= 0) { // Check that position is in bounds
                        if (this.state[row - 1][col + 1] != player && this.state[row - 1][col + 1] != 0 
                            && this.state[row - 2][col + 2] === 0) {
                                moves.push(new Move([row, col], [row - 2, col + 2]));
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
        return this.getMoves().includes(move);
    }


    move(move) {
        console.log(move);
        if (this.turn % 2 === 0) {
            if (this.getMoves().includes(move)) {
                this.state[move.getNewPos[0]][move.getNewPos[1]] = player;
                this.state[move.getOldPos[0]][move.getOldPos[1]] = 0;
                if (move.getHop != null) {
                    this.state[move.getHop[0]][move.getHop[1]] = 0;
                }
                this.turn++;
                return true;
            } else {
                return false;
            }
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
    
    toPrettyString() {
        let str = '';
        for (let row = 0; row < this.state.length; row++) {
            for (let col = 0; col < this.state[row].length; col++) {
                switch (this.state[row][col]) {
                    case 0:
                        str += this.state[row][col] + ' ';
                        break;
                    case 1:
                        str += '\u001b[31m' + this.state[row][col] + ' \u001b[0m';
                        break;
                    case 2:
                        str += '\u001b[34m' + this.state[row][col] + ' \u001b[0m';
                        break;
                    default:
                        break;
                }
            }
            str += '\n';
        }
        return str;
    }
}

export default Game;
