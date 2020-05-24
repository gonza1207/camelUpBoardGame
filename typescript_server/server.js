"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var currentPlayer;
// Create a new express app instance
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);
    socket.on('diceThrown', function (player) {
        if (isPlayerTurn(player)) {
            console.log('isPlayerTurn');
            currentPlayer = '';
        }
        else {
            console.log('is not player turn');
            currentPlayer = player;
        }
        io.emit('serverThrowDice');
    });
    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
    });
});
http.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
function isPlayerTurn(player) {
    return currentPlayer === player;
}
