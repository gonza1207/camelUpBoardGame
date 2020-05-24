import express = require('express');

let currentPlayer : string;

// Create a new express app instance
const app: express.Application = express();



const http = require('http').createServer(app);
const io = require('socket.io')(http);
io.on('connection', function (socket : any) {
    console.log('A user connected: ' + socket.id);

    socket.on('diceThrown', function (player : string) {
        if (isPlayerTurn(player)) {
            console.log('isPlayerTurn');
            currentPlayer = '';
        } else {
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

function isPlayerTurn(player : string) : boolean {
    return currentPlayer === player;
}