import Game from './game.js';
import Move from './move.js';

import promptSync from 'prompt-sync';
const prompt = promptSync();

// TODO: Fix prompt so that user can do CTRL+C to exit

console.log('Creating new draughts game...');

let player_name = prompt('Enter your name: ');
let game = new Game(1, player_name, 'CPU');

if (game) {
    while (game.getWinner === 0 || game.getWinner === null) {
        console.clear();
        console.log('Draughts Game: ' + game.getPlayers[0] + ' vs ' + game.getPlayers[1]);
        console.log('Turn: ' + game.turn + (game.turn % 2 ===0 ? ' (' + game.player1 + ')' : ' (' + game.player2 + ')'));
    
        if (game.lastMove) console.log('CPU moved ' + game.lastMove.toString());

        // Display board
        console.log('\n\n' + game.toPrettyString());
    
        // Display moves
        console.log('Moves:');
        if (game.getMoves().length > 0) {
            for (let i = 0; i < game.getMoves().length; i++) {
                console.log(i + '. ' + game.getMoves()[i].toString());
            }
        } else {
            console.log('No moves available');
            break;
        }
    
        // If player turn
        if (game.turn % 2 === 0) {
            let completed = false;
            while (!completed) {
                let move = prompt('\nEnter move: ');
                // If input is a number
                if (move > 0 && move < game.getMoves().length) {
                    // If move is valid
                    let playerMove = game.getMoves()[Number(move)];

                    if (game.move(playerMove)) {
                        console.log('Move successful!');
                        completed = true; // break out of while loop
                    } else {
                        console.log('Move failed!');
                        // loop will continue
                    }
                } else {
                    console.log('Invalid input');
                }
            }
        } else {
            if (game.move(game.getMoves()[Math.floor(Math.random() * game.getMoves().length)])) {
                console.log('CPU moved successfully!');
            } else {
                console.log('CPU move failed!');
                break;
            }
        }
    }
    
    console.log('Game over!');
    console.log('Winner: ' + game.getWinner);
}
