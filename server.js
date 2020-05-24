const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
let players = [];
let currentPlayer;

let unMovedCamels;
let thrownDices;

let camelsPosition;
startGame();

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    players.push(socket.id);

    if (players.length === 1) {
        io.emit('isPlayerA');
    };

    io.emit('camelsPosition', camelsPosition);

    socket.on('dealCards', function () {
        io.emit('dealCards');
    });

    socket.on('diceThrown', function (player) {
        if (isPlayerTurn(player)) {
            console.log('isPlayerTurn');
            currentPlayer = null;
        } else {
            console.log('is not player turn');
            currentPlayer = player;
        }
        let diceThrow = throwDice();
        camelsPosition[diceThrow[0]] += diceThrow[1];
        console.log(camelsPosition);
        io.emit('serverThrowDice', diceThrow);

        if (isGameOver()) {
            console.log('Game Over!');
            startGame();
        } else if (isRoundOver()) {
            initializeRound();
        }

    });

    socket.on('cardPlayed', function (gameObject, isPlayerA) {
        io.emit('cardPlayed', gameObject, isPlayerA);
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        players = players.filter(player => player !== socket.id);
    });
});

http.listen(3000, function () {
    console.log('Server started!');
});

function isPlayerTurn(player) {
    return currentPlayer === player;
}

function initializeRound() {
    unMovedCamels = ['blue', 'green', 'orange', 'yellow', 'white'];
    thrownDices = [];
}

function throwDice() {
    camel = unMovedCamels.splice(chooseCamel()-1, 1);
    let diceThrow = [camel, randomNumber(3)]
    thrownDices.push(diceThrow);
    return diceThrow;
}

function chooseCamel() {
    return randomNumber(unMovedCamels.length);
}

function randomNumber(maxValues) {
    return Math.floor( Math.random() * maxValues ) + 1;
}

function isGameOver(){
    for(camel in camelsPosition){
        if (camelsPosition[camel] > 16) {
            return true;
        }
    };
    return false;
}

function isRoundOver(){
    return unMovedCamels.length === 0;
}

function startGame(){
    initializeRound();
    camelsPosition = {};
    for (camel of unMovedCamels) {
        console.log('camell: ' + camel);
        camelsPosition[camel] = 0;
    }
}