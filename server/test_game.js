import Game from './game.js';
import Move from './move.js';

console.log('Creating new draughts game...');
let g1 = new Game(1, 'player1', 'player2');

console.log('Game ID: ' + g1.getId);
console.log('Players: ' + g1.getPlayers);

console.log('Turn: ' + g1.getTurn);
console.log('State:\n' + g1.toPrettyString());
console.log('Moves:\n');
for (let move of g1.getMoves()) {
    console.log(move.toPrettyString());
}

let m1 = new Move([2, 1], [3, 1], null);
console.log('Move: ' + m1.toJSON());

// currently this is not working
console.log(g1.isValidMove(m1));

console.log('\nMoving piece from (2, 1) to (3, 1)...');
if (g1.move(m1)) {
    console.log('Move successful!');
} else {
    console.log('Move failed!');
}
