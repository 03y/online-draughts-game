// API server for an online game of draughts/checkers.
// This is the server-side code for the game.
// Anyone can view the games being played, but only the players can make moves.
// We ensure that the players are who they say they are by using public and private keys.
// The server verifies that the moves are legal, and then broadcasts the move to all players.
// The server also keeps track of the game state, and can tell if a player has won.

import fs from 'fs';
import http from 'http';

import Game from './game.js';

var server = http.createServer(function(req, res) {
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
});

const gets = [];
const posts = [];
let games = [];

// This is the public key for the server.
// It is used to verify that the player is who they say they are.
const publicKey = fs.readFileSync('public.pem', 'utf8');

// This is the private key for the server.
// It is used to sign the game state so that the players can verify that the server is not cheating.
const privateKey = fs.readFileSync('private.pem', 'utf8');


