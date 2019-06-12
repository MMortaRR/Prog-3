var Grass = require("./grass");
var GrassEater = require("grasseater.js");
var Predator = require("predator.js");
var Blackhole = require("blackhole.js");
var Giant = require("giant.js");
let random = require('random');

grassArr = [];
grassEaterArr = [];
predatorArr = [];
bhArr = [];
giantArr = [];
matrix = [];
grassHashiv = 0;

function matrixGenerator(matrixSize, grass, grassEater, predator, blackhole, giant) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < blackhole; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < giant; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 1, 1);

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var grass = new Predator(x, y);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 3) {
                var grass = new BlackHole(x, y);
                bhArr.push(Blackhole);
            }
            else if (matrix[y][x] == 3) {
                var grass = new Giant(x, y);
                giantArr.push(Giant);
            }
        }
    }
    creatingObjects();

    function game() {
        if (grassArr[0] !== undefined) {
            for (var i in grassArr) {
                grassArr[i].mul();
            }
        }
        if (grassEaterArr[0] !== undefined) {
            for (var i in grassEaterArr) {
                grassEaterArr[i].eat();
            }
        }
        if (predatorArr[0] !== undefined) {
            for (var i in predatorArr) {
                predatorArr[i].eat();
            }
        }
        if (bhArr[0] !== undefined) {
            for (var i in bhArr) {
                bhArr[i].eat();
            }
        }
        if (giantArr[0] !== undefined) {
            for (var i in giantArr) {
                giantArr[i].eat();
            }
        }
    }
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv
    }

    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)