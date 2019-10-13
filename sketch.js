var train = true;
var dataset;
var nn;

var raquete;
var bola;

var teclaEsquerda = 0;
var teclaDireita = 0;

var contadorFrame = 0;
var contadorGeracao = 0;

function setup() {
    createCanvas(800, 600);


    /*
    nn = new RedeNeural(2, 3, 1);

    // XOR
    dataset = {
        inputs:
            [[0, 0],
            [0, 1],
            [1, 0],
            [1, 1]],
        outputs:
            [[0],
            [1],
            [1],
            [0]]
    };*/

    nn = new RedeNeural(3, 20, 2);

    //JOGAR PONG


    //SETUP DO JOGO
    raquete = new Raquete();
    bola = new Bola();

    dataset = [{
        input: [267, 100, 400],
        output: [0, 0]
    }, {
        input: [134, 180, 400],
        output: [0, 0]
    }, {
        input: [1, 260, 400],
        output: [0, 0]
    }, {
        input: [23, 273, 350],
        output: [1, 0]
    }, {
        input: [74, 304, 300],
        output: [1, 0]
    }, {
        input: [130, 337, 250],
        output: [1, 0]
    }, {
        input: [263, 417, 250],
        output: [0, 0]
    }, {
        input: [271, 423, 300],
        output: [0, 1]
    }, {
        input: [327, 456, 350],
        output: [0, 1]
    }, {
        input: [383, 454, 400],
        output: [0, 1]
    }, {
        input: [439, 422, 450],
        output: [0, 1]
    }, {
        input: [491, 392, 500],
        output: [0, 1]
    }, {
        input: [547, 359, 550],
        output: [0, 1]
    }, {
        input: [682, 282, 550],
        output: [0, 0]
    }, {
        input: [781, 205, 550],
        output: [0, 0]
    }, {
        input: [647, 127, 550],
        output: [0, 0]
    }, {
        input: [638, 122, 500],
        output: [1, 0]
    }, {
        input: [595, 97, 450],
        output: [1, 0]
    }, {
        input: [547, 70, 400],
        output: [1, 0]
    }, {
        input: [482, 32, 350],
        output: [1, 0]
    }, {
        input: [422, 7, 300],
        output: [1, 0]
    }, {
        input: [287, 85, 300],
        output: [0, 0]
    }, {
        input: [192, 140, 250],
        output: [1, 0]
    }, {
        input: [58, 217, 250],
        output: [0, 0]
    }, {
        input: [80, 294, 250],
        output: [0, 0]
    }, {
        input: [214, 372, 250],
        output: [0, 0]
    }, {
        input: [222, 377, 300],
        output: [0, 1]
    }, {
        input: [348, 449, 350],
        output: [0, 1]
    }, {
        input: [480, 413, 350],
        output: [0, 0]
    }, {
        input: [497, 403, 400],
        output: [0, 1]
    }, {
        input: [628, 320, 400],
        output: [0, 0]
    }, {
        input: [760, 238, 400],
        output: [0, 0]
    }, {
        input: [705, 155, 400],
        output: [0, 0]
    }, {
        input: [573, 73, 400],
        output: [0, 0]
    }, {
        input: [442, 17, 400],
        output: [0, 0]
    }, {
        input: [311, 99, 400],
        output: [0, 0]
    }, {
        input: [180, 182, 400],
        output: [0, 0]
    }, {
        input: [48, 264, 400],
        output: [0, 0]
    }, {
        input: [87, 347, 400],
        output: [0, 0]
    }, {
        input: [154, 389, 350],
        output: [1, 0]
    }, {
        input: [205, 421, 300],
        output: [1, 0]
    }, {
        input: [339, 444, 300],
        output: [0, 0]
    }, {
        input: [476, 372, 300],
        output: [0, 0]
    }, {
        input: [498, 360, 350],
        output: [0, 1]
    }, {
        input: [556, 330, 400],
        output: [0, 1]
    }, {
        input: [671, 270, 450],
        output: [0, 1]
    }, {
        input: [782, 198, 450],
        output: [0, 0]
    }, {
        input: [644, 126, 450],
        output: [0, 0]
    }, {
        input: [507, 54, 450],
        output: [0, 0]
    }, {
        input: [370, 24, 450],
        output: [0, 0]
    }, {
        input: [232, 96, 450],
        output: [0, 0]
    }, {
        input: [95, 168, 450],
        output: [0, 0]
    }, {
        input: [46, 240, 450],
        output: [0, 0]
    }, {
        input: [184, 312, 450],
        output: [0, 0]
    }, {
        input: [321, 384, 450],
        output: [0, 0]
    }, {
        input: [445, 449, 500],
        output: [0, 1]
    }, {
        input: [570, 454, 550],
        output: [0, 1]
    }, {
        input: [718, 408, 550],
        output: [0, 0]
    }, {
        input: [732, 361, 550],
        output: [0, 0]
    }, {
        input: [680, 345, 500],
        output: [1, 0]
    }, {
        input: [632, 329, 450],
        output: [1, 0]
    }, {
        input: [570, 310, 400],
        output: [1, 0]
    }, {
        input: [422, 263, 400],
        output: [0, 0]
    }, {
        input: [274, 217, 400],
        output: [0, 0]
    }, {
        input: [127, 170, 400],
        output: [0, 0]
    }, {
        input: [26, 123, 400],
        output: [0, 0]
    }, {
        input: [174, 77, 400],
        output: [0, 0]
    }, {
        input: [322, 30, 400],
        output: [0, 0]
    }, {
        input: [470, 25, 400],
        output: [0, 0]
    }, {
        input: [618, 72, 400],
        output: [0, 0]
    }, {
        input: [766, 119, 400],
        output: [0, 0]
    }, {
        input: [684, 165, 400],
        output: [0, 0]
    }, {
        input: [537, 212, 400],
        output: [0, 0]
    }, {
        input: [441, 242, 350],
        output: [1, 0]
    }, {
        input: [379, 262, 300],
        output: [1, 0]
    }, {
        input: [322, 280, 250],
        output: [1, 0]
    }, {
        input: [265, 298, 200],
        output: [1, 0]
    }, {
        input: [203, 317, 150],
        output: [1, 0]
    }, {
        input: [55, 364, 150],
        output: [0, 0]
    }, {
        input: [36, 370, 100],
        output: [1, 0]
    }, {
        input: [108, 414, 150],
        output: [0, 1]
    }, {
        input: [165, 432, 200],
        output: [0, 1]
    }, {
        input: [222, 450, 250],
        output: [0, 1]
    }, {
        input: [284, 469, 300],
        output: [0, 1]
    }, {
        input: [335, 453, 350],
        output: [0, 1]
    }, {
        input: [400, 427, 400],
        output: [0, 1]
    }, {
        input: [461, 404, 450],
        output: [0, 1]
    }, {
        input: [605, 347, 450],
        output: [0, 0]
    }, {
        input: [750, 291, 450],
        output: [0, 0]
    }, {
        input: [698, 234, 450],
        output: [0, 0]
    }, {
        input: [554, 178, 450],
        output: [0, 0]
    }, {
        input: [410, 121, 450],
        output: [0, 0]
    }, {
        input: [265, 65, 450],
        output: [0, 0]
    }, {
        input: [121, 8, 450],
        output: [0, 0]
    }, {
        input: [23, 57, 450],
        output: [0, 0]
    }, {
        input: [168, 114, 450],
        output: [0, 0]
    }, {
        input: [312, 170, 450],
        output: [0, 0]
    }, {
        input: [410, 209, 500],
        output: [0, 1]
    }, {
        input: [470, 232, 550],
        output: [0, 1]
    }, {
        input: [582, 276, 600],
        output: [0, 1]
    }, {
        input: [629, 294, 650],
        output: [0, 1]
    }, {
        input: [773, 351, 650],
        output: [0, 0]
    }, {
        input: [675, 407, 650],
        output: [0, 0]
    }, {
        input: [652, 416, 600],
        output: [1, 0]
    }, {
        input: [601, 436, 550],
        output: [1, 0]
    }, {
        input: [535, 462, 500],
        output: [1, 0]
    }, {
        input: [484, 460, 450],
        output: [1, 0]
    }, {
        input: [340, 402, 450],
        output: [0, 0]
    }, {
        input: [313, 391, 400],
        output: [1, 0]
    }, {
        input: [169, 333, 400],
        output: [0, 0]
    }, {
        input: [25, 276, 400],
        output: [0, 0]
    }, {
        input: [122, 218, 400],
        output: [0, 0]
    }, {
        input: [266, 160, 400],
        output: [0, 0]
    }, {
        input: [410, 103, 400],
        output: [0, 0]
    }, {
        input: [554, 45, 400],
        output: [0, 0]
    }, {
        input: [698, 21, 400],
        output: [0, 0]
    }, {
        input: [749, 79, 400],
        output: [0, 0]
    }, {
        input: [605, 136, 400],
        output: [0, 0]
    }, {
        input: [461, 194, 400],
        output: [0, 0]
    }, {
        input: [410, 214, 350],
        output: [1, 0]
    }, {
        input: [354, 237, 300],
        output: [1, 0]
    }, {
        input: [303, 257, 250],
        output: [1, 0]
    }, {
        input: [262, 274, 200],
        output: [1, 0]
    }, {
        input: [192, 302, 150],
        output: [1, 0]
    }, {
        input: [132, 326, 100],
        output: [1, 0]
    }, {
        input: [16, 384, 100],
        output: [0, 0]
    }, {
        input: [132, 430, 150],
        output: [0, 1]
    }, {
        input: [183, 451, 200],
        output: [0, 1]
    }, {
        input: [234, 471, 250],
        output: [0, 1]
    }, {
        input: [288, 445, 300],
        output: [0, 1]
    }, {
        input: [346, 417, 350],
        output: [0, 1]
    }, {
        input: [396, 393, 400],
        output: [0, 1]
    }, {
        input: [445, 369, 450],
        output: [0, 1]
    }, {
        input: [517, 334, 500],
        output: [0, 1]
    }, {
        input: [657, 266, 500],
        output: [0, 0]
    }, {
        input: [796, 199, 500],
        output: [0, 0]
    }, {
        input: [657, 132, 500],
        output: [0, 0]
    }, {
        input: [517, 64, 500],
        output: [0, 0]
    }, {
        input: [378, 10, 500],
        output: [0, 0]
    }, {
        input: [238, 77, 500],
        output: [0, 0]
    }, {
        input: [99, 145, 500],
        output: [0, 0]
    }, {
        input: [49, 212, 500],
        output: [0, 0]
    }, {
        input: [189, 280, 500],
        output: [0, 0]
    }, {
        input: [328, 347, 500],
        output: [0, 0]
    }, {
        input: [351, 358, 550],
        output: [0, 1]
    }, {
        input: [490, 425, 550],
        output: [0, 0]
    }, {
        input: [558, 458, 600],
        output: [0, 1]
    }, {
        input: [603, 462, 650],
        output: [0, 1]
    }, {
        input: [743, 395, 650],
        output: [0, 0]
    }, {
        input: [774, 380, 600],
        output: [1, 0]
    }, {
        input: [774, 359, 550],
        output: [1, 0]
    }, {
        input: [720, 333, 500],
        output: [1, 0]
    }, {
        input: [666, 307, 450],
        output: [1, 0]
    }, {
        input: [612, 281, 400],
        output: [1, 0]
    }, {
        input: [522, 238, 350],
        output: [1, 0]
    }, {
        input: [395, 177, 400],
        output: [0, 1]
    }, {
        input: [256, 111, 400],
        output: [0, 0]
    }, {
        input: [116, 44, 400],
        output: [0, 0]
    }, {
        input: [30, 29, 400],
        output: [0, 0]
    }, {
        input: [170, 95, 400],
        output: [0, 0]
    }, {
        input: [310, 162, 400],
        output: [0, 0]
    }, {
        input: [332, 173, 450],
        output: [0, 1]
    }, {
        input: [391, 201, 500],
        output: [0, 1]
    }, {
        input: [441, 225, 550],
        output: [0, 1]
    }, {
        input: [495, 251, 600],
        output: [0, 1]
    }, {
        input: [634, 318, 600],
        output: [0, 0]
    }, {
        input: [770, 383, 650],
        output: [0, 1]
    }, {
        input: [779, 404, 700],
        output: [0, 1]
    }, {
        input: [657, 462, 650],
        output: [1, 0]
    }, {
        input: [597, 454, 600],
        output: [1, 0]
    }, {
        input: [537, 429, 550],
        output: [1, 0]
    }, {
        input: [472, 403, 500],
        output: [1, 0]
    }, {
        input: [412, 378, 450],
        output: [1, 0]
    }, {
        input: [361, 357, 400],
        output: [1, 0]
    }, {
        input: [301, 333, 350],
        output: [1, 0]
    }, {
        input: [158, 274, 350],
        output: [0, 0]
    }, {
        input: [14, 215, 350],
        output: [0, 0]
    }, {
        input: [130, 156, 350],
        output: [0, 0]
    }, {
        input: [273, 98, 350],
        output: [0, 0]
    }, {
        input: [417, 39, 350],
        output: [0, 0]
    }, {
        input: [560, 26, 350],
        output: [0, 0]
    }, {
        input: [704, 84, 350],
        output: [0, 0]
    }, {
        input: [745, 143, 350],
        output: [0, 0]
    }, {
        input: [602, 202, 350],
        output: [0, 0]
    }, {
        input: [500, 244, 300],
        output: [1, 0]
    }, {
        input: [445, 266, 250],
        output: [1, 0]
    }, {
        input: [389, 289, 200],
        output: [1, 0]
    }, {
        input: [334, 312, 150],
        output: [1, 0]
    }, {
        input: [273, 336, 100],
        output: [1, 0]
    }, {
        input: [227, 355, 100],
        output: [1, 0]
    }, {
        input: [84, 414, 100],
        output: [0, 0]
    }, {
        input: [61, 470, 100],
        output: [0, 0]
    }, {
        input: [175, 422, 150],
        output: [0, 1]
    }, {
        input: [225, 400, 200],
        output: [0, 1]
    }, {
        input: [280, 376, 250],
        output: [0, 1]
    }, {
        input: [335, 351, 300],
        output: [0, 1]
    }, {
        input: [380, 331, 350],
        output: [0, 1]
    }, {
        input: [435, 306, 400],
        output: [0, 1]
    }, {
        input: [572, 245, 450],
        output: [0, 1]
    }, {
        input: [714, 182, 450],
        output: [0, 0]
    }, {
        input: [736, 119, 450],
        output: [0, 0]
    }, {
        input: [595, 55, 450],
        output: [0, 0]
    }, {
        input: [453, 17, 450],
        output: [0, 0]
    }, {
        input: [312, 80, 450],
        output: [0, 0]
    }, {
        input: [170, 143, 450],
        output: [0, 0]
    }, {
        input: [79, 184, 400],
        output: [1, 0]
    }, {
        input: [29, 206, 350],
        output: [1, 0]
    }, {
        input: [24, 229, 300],
        output: [1, 0]
    }, {
        input: [88, 257, 250],
        output: [1, 0]
    }, {
        input: [193, 304, 300],
        output: [0, 1]
    }, {
        input: [248, 329, 350],
        output: [0, 1]
    }, {
        input: [303, 353, 400],
        output: [0, 1]
    }, {
        input: [353, 376, 450],
        output: [0, 1]
    }, {
        input: [403, 398, 500],
        output: [0, 1]
    }, {
        input: [463, 425, 550],
        output: [0, 1]
    }, {
        input: [517, 449, 600],
        output: [0, 1]
    }, {
        input: [659, 431, 600],
        output: [0, 0]
    }, {
        input: [792, 368, 600],
        output: [0, 0]
    }, {
        input: [650, 306, 600],
        output: [0, 0]
    }, {
        input: [508, 243, 600],
        output: [0, 0]
    }, {
        input: [366, 180, 600],
        output: [0, 0]
    }, {
        input: [225, 118, 600],
        output: [0, 0]
    }, {
        input: [83, 55, 600],
        output: [0, 0]
    }, {
        input: [60, 13, 600],
        output: [0, 0]
    }, {
        input: [202, 75, 600],
        output: [0, 0]
    }, {
        input: [343, 138, 600],
        output: [0, 0]
    }, {
        input: [485, 201, 600],
        output: [0, 0]
    }, {
        input: [604, 253, 650],
        output: [0, 1]
    }, {
        input: [654, 275, 700],
        output: [0, 1]
    }, {
        input: [714, 302, 700],
        output: [0, 1]
    }, {
        input: [737, 364, 700],
        output: [0, 0]
    }, {
        input: [673, 393, 650],
        output: [1, 0]
    }, {
        input: [622, 415, 600],
        output: [1, 0]
    }, {
        input: [572, 437, 550],
        output: [1, 0]
    }, {
        input: [517, 461, 500],
        output: [1, 0]
    }, {
        input: [466, 471, 450],
        output: [1, 0]
    }, {
        input: [315, 479, 450],
        output: [0, 0]
    }, {
        input: [164, 513, 450],
        output: [0, 0]
    }, {
        input: [13, 548, 450],
        output: [0, 0]
    }, {
        input: [144, 582, 450],
        output: [0, 0]
    }, {
        input: [403, 74, 450],
        output: [0, 0]
    }, {
        input: [414, 229, 450],
        output: [0, 0]
    }, {
        input: [417, 264, 500],
        output: [0, 1]
    }, {
        input: [422, 329, 550],
        output: [0, 1]
    }, {
        input: [426, 389, 600],
        output: [0, 1]
    }, {
        input: [437, 543, 600],
        output: [0, 0]
    }, {
        input: [409, 109, 600],
        output: [0, 0]
    }, {
        input: [426, 263, 600],
        output: [0, 0]
    }, {
        input: [443, 417, 600],
        output: [0, 0]
    }, {
        input: [459, 571, 600],
        output: [0, 0]
    }];

    //dataset = '[';

}

function draw() {

    background(0);
    raquete.draw();

    bola.update();
    bola.draw();

    /*
    var bolaX = int(bola.x);
    var bolaY = int(bola.y);
    var raqueteX = raquete.x;
    contadorFrame++;
    if (teclaEsquerda == 1 || teclaDireita == 1 || contadorFrame > 30) {
        contadorFrame = 0;
        dataset += `{
    input: [${bolaX}, ${bolaY}, ${raqueteX}],
    output: [${ teclaEsquerda}, ${teclaDireita}]
},`;
    }

    teclaEsquerda = 0;
    teclaDireita = 0;

    if (bola.vidas <= 0) {
        dataset += ']';
        dataset = dataset.replace(',]', ']');
        console.log(dataset);
        console.table(dataset);
        bola = new Bola();
        noLoop();///
    }*/
    
    if (train) {
        var bolaX = int(bola.x);
        var bolaY = int(bola.y);
        var raqueteX = raquete.x;

        let predicao = nn.predict([bolaX / 1000, bolaY / 1000, raqueteX / 1000])
        let pressLeft = predicao[0];
        let pressRight = predicao[1];
        let maxPress = max(pressLeft, pressRight);

        if (maxPress > 0.5) {
            if (pressLeft == maxPress) {
                raquete.moveLeft();
            }
            else {
                raquete.moveRight();
            }
        }

        if (bola.vidas <= 0) {
            console.log(`Aff, só consegui ${bola.maxScore} pontos :-(`)
            console.log('Vou treinar...');
            for (var i = 0; i < 1000; i++) {
                var index = floor(random(dataset.length));
                let entrada = dataset[index].input.map(
                    function (element, i) {
                        return element/1000;
                    });
                let saida = dataset[index].output;
                nn.train(entrada, saida);
            }
            contadorGeracao++;
            console.log(`Agora, na ${contadorGeracao}º geração, vou conseguir ;-)`);
            bola = new Bola();
        }

        /*if (nn.predict([0, 0])[0] < 0.002 && nn.predict([1, 0])[0] > 0.998) {
            train = false;
            console.log('terminou');
        }
        console.log(nn.predict([0, 0])[0]);
        console.log(nn.predict([0, 1])[0] - 1);
        console.log(nn.predict([1, 0])[0] - 1);
        console.log(nn.predict([1, 1])[0]);
        console.log('-----------------------------');*/
    }
}

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        raquete.moveLeft();
        teclaEsquerda = 1;
    }
    if (keyCode == RIGHT_ARROW) {
        raquete.moveRight();
        teclaDireita = 1;
    }
}

class Raquete {
    constructor() {
        this.x = width / 2;
        this.y = height * 0.8;
        this.width = 200;
        this.height = 10;
        this.increment = 50;

        this.setEdges();
    }

    moveLeft() {
        console.warn('CLICANDO PRA ESQUERDA');
        if (this.x - this.increment > this.width / 2) {
            this.x -= this.increment;
        }
        else {
            this.x = this.width / 2;
        }
        this.setEdges();
    }
    moveRight() {
        console.warn('CLICANDO PRA DIREITA');
        if (this.x + this.increment < width - this.width / 2) {
            this.x += this.increment;
        }
        else {
            this.x = width - this.width / 2;
        }
        this.setEdges();
    }

    setEdges() {
        this.left = this.x - this.width / 2;
        this.right = this.x + this.width / 2;
        this.top = this.y - this.height / 2;
        this.bottom = this.y + this.height / 2;
    }

    draw() {
        noStroke();
        fill(255);
        rect(this.left, this.top, this.width, this.height);
    }
}

class Bola {
    constructor() {
        this.x = width / 2;
        this.y = 20;
        this.width = 10;
        this.height = 10;
        this.speed = 5;
        this.moveAngle = (random() > 0.5 ? PI / 4 : 3 * PI / 4); //map(random(), 0, 1, 0.5, PI - 0.5);
        this.vidas = 3;
        this.score = 0;
        this.maxScore = 0;
        this.setEdges();
    }

    update() {
        if (this.vidas > 0) {
            this.x += this.speed * cos(this.moveAngle);
            this.y += this.speed * sin(this.moveAngle);

            this.setEdges();

            //COLISÃO COM PAREDES LATERAIS
            if (this.left <= 0 || this.right >= width) {
                this.moveAngle = ((this.moveAngle - PI / 2) * (-1)) + PI / 2;
            }

            //COLISÃO COM PAREDE SUPERIOR
            if (this.top <= 0) {
                this.moveAngle = this.moveAngle * (-1);
            }

            //COLISÃO COM RAQUETE
            if (this.bottom >= raquete.top && this.top <= raquete.top &&
                this.right >= raquete.left && this.left <= raquete.right) {
                this.moveAngle = this.moveAngle * (-1);
                //this.moveAngle += random() * 0.2 - 0.1;
                this.score++;
                if (this.score > this.maxScore) {
                    this.maxScore = this.score;
                }
                this.y = raquete.top - this.height;
                this.speed += 0.2;
            }

            //SAÍDA PELA PARTE INFERIOR DA TELA
            if (this.top >= height) {
                this.vidas--;

                this.x = width / 2;
                this.y = 20;
                this.moveAngle = (random() > 0.5 ? PI / 4 : 3 * PI / 4); //map(random(), 0, 1, 0.5, PI - 0.5);
                this.score = 0;

                this.setEdges();
            }
        }
    }

    setEdges() {
        this.left = this.x - this.width / 2;
        this.right = this.x + this.width / 2;
        this.top = this.y - this.height / 2;
        this.bottom = this.y + this.height / 2;
    }

    draw() {
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.width, this.height);

        text(`VIDAS: ${this.vidas}`, 10, 20);
        text(`SCORE: ${this.score}`, 10, 35);
    }
}