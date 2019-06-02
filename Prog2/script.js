
var side = 20;
var grassArr = []; //խոտերի զանգված
var eatArr = []; //խոտակերների զանգված
var preArr = []; //գիշատիչներ
var holeArr = [];// սև անցքեր
var giantArr = [];//հսկաների զանգված


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


let d = 0;
var matrix = [];
for (let i = 0; i < 35; i++) {
    let b = [];
    matrix[i] = b;
    for (let j = 0; j < 35; j++) {
        let c = getRndInteger(0, 50);
        if (c < 6) {
            d = 0;
        } else if (c > 6 && c < 17) {
            d = 1;
        } else if (c > 17 && c < 37) {
            d = 2;
        } else if (c > 37 && c < 47) {
            d = 3;
        } else if (c >= 47 && c <= 48) {
            d = 4;
        } else if (c > 48 && c <= 50) {
            d = 5;
        }
        matrix[i][j] = d;
    }
}
console.log(matrix);
function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side); //կտավի չափերը դնել մատրիցայի չափերին համապատասխան
    background('#acacac');

    //Կրկնակի ցիկլը լցնում է օբյեկտներով խոտերի և խոտակերների զանգվածները
    //հիմնվելով մատրիցի վրա 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            } else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                preArr.push(predator);
            } else if (matrix[y][x] == 4) {
                var blackhole = new BlackHole(x, y);
                holeArr.push(blackhole);
            } else if (matrix[y][x] == 5) {
                var giant = new Giant(x, y);
                giantArr.push(giant);
            }
        }
    }
}

//draw ֆունկցիան գծում է «կադրերը», վարկյանում 60 կադր արագությամբ
//եթե տրված չէ այլ կարգավորում frameRate ֆունկցիայի միջոցով
//draw ֆունկցիան ինչ որ իմաստով անվերջ կրկնություն է (цикл, loop)
function draw() {
    //Գծում է աշխարհը, հիմվելով matrix-ի վրա
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
                fill("yellow");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 0) {
                fill("#d7e0ff");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 3) {
                fill("red");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 4) {
                fill("black");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 5) {
                fill("#003399");
                rect(j * side, i * side, side, side);
            }
        }
    }


    //յուրաքանչյուր խոտ փորձում է բազմանալ
    for (var i in grassArr) {
        grassArr[i].mul();
    }

    //յուրաքանչյուր խոտակեր փորձում է ուտել խոտ
    for (var i in eatArr) {
        eatArr[i].eat();
    }

    for (var i in preArr) {
        preArr[i].eat();
    }

    for (var i in holeArr) {
        holeArr[i].eat();
    }

    for (var i in giantArr) {
        giantArr[i].eat();
    }
}