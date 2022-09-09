import Game from './game.js';
import Move from './move.js';

import process from 'process';

console.log('Creating new draughts game...');
let game = new Game(1, 'player1', 'player2');
console.log('Game ID: ' + game.getId);
console.log('Players: ' + game.getPlayers);

while (game.getWinner === 0 || game.getWinner === null) {
    console.clear();

    console.log('Turn: ' + game.turn + (game.turn % 2 === 0 ? ' (red)' : ' (blue)'));
    if (game.lastMove) console.log('Last move: Piece (' + game.lastMove.old_pos[0] + ', ' + game.lastMove.old_pos[1] + ') moved to (' + game.lastMove.new_pos[0] + ', ' + game.lastMove.new_pos[1] + ')');


    console.log('\n\n' + game.toPrettyString());
    
    console.log('Moves:');
    if (game.getMoves().length > 0) {
        for (let move of game.getMoves()) {
            console.log(move.toString());

            // TODO: This is temporary, remove this later
            // if (move.getHops) {
            //     console.log('Forcing exit');
            //     process.exit();
            // }
        }
    } else {
        console.log('No moves available');
        break;
    }
    

    // TODO: Make an algorithm to choose the best move (AI??)
    // pick random move
    let move = game.getMoves()[Math.floor(Math.random() * game.getMoves().length)];
    console.log('\nMove: ' + move.toString());
    console.log('Move is valid?');
    console.log(game.isValidMove(move));
    
    console.log('\nMaking move...');
    if (game.move(move)) {
        console.log('Move successful!');
    } else {
        console.log('Move failed!');
        break;
    }

    await new Promise(r => setTimeout(r, 100));
}

console.log('\nGame over!');
console.log('Winner: ' + game.getWinner);
