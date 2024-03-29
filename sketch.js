var train = true;
//var dataset;

var redeNeural;
var raquete;
var bola;

var larguraPlayground = 800;
var alturaPlayground = 600;

var teclaEsquerda = 0;
var teclaDireita = 0;

var contadorFrame = 0;
var contadorGeracao = 0;

var qtdeIndividuosPorGeracao = 30;

function setup() {
    createCanvas(1000, 600);

    redeNeural = [];
    raquete = [];
    bola = [];

    for (let i = 0; i < qtdeIndividuosPorGeracao; i++) {
        redeNeural.push(new RedeNeural(3, 20, 2));

        raquete.push(new Raquete(i));
        bola.push(new Bola(i));
    }
}

function draw() {

    background(0);

    noFill();
    stroke(255);
    line(larguraPlayground, 0, larguraPlayground, height);

    let contPlayersAtivos = 0;
    for (let i = 0; i < qtdeIndividuosPorGeracao; i++) {
        raquete[i].draw();
        bola[i].update();
        bola[i].draw();

        if (bola[i].vidas > 0) {

            bola[i].show();
            raquete[i].show();

            bola[i].info(contPlayersAtivos);
            contPlayersAtivos++;
        }

        var bolaX = int(bola[i].x);
        var bolaY = int(bola[i].y);
        var raqueteX = raquete[i].x;

        let predicao = redeNeural[i].predict([bolaX / 1000, bolaY / 1000, raqueteX / 1000])
        let pressLeft = predicao[0];
        let pressRight = predicao[1];
        let maxPress = max(pressLeft, pressRight);

        if (maxPress > 0.2) {
            if (pressLeft == maxPress) {
                raquete[i].moveLeft();
            }
            else {
                raquete[i].moveRight();
            }
        }

        if (bola[i].vidas <= 0) {
            redeNeural[i].score = bola[i].maxScore;
        }
    }

    //TODOS AS BOLINHAS MORRERAM?
    let fimDaGeracao = true;

    for (let i = 0; i < qtdeIndividuosPorGeracao; i++) {
        if (bola[i].vidas > 0) {
            fimDaGeracao = false;
        }
    }

    if (fimDaGeracao) {
        /*let novasRedesNeurais = RedeNeural.selecaoNatural(redeNeural, 3);
        novasRedesNeurais = RedeNeural.replicarMelhoresRedes(novasRedesNeurais, qtdeIndividuosPorGeracao);
        novasRedesNeurais = RedeNeural.crossOver(novasRedesNeurais, 3);*/
        let novasRedesNeurais = RedeNeural.selecaoNatural_Antigo(redeNeural, 3);
        novasRedesNeurais = RedeNeural.crossOver_Antigo(novasRedesNeurais, qtdeIndividuosPorGeracao);
        //novasRedesNeurais = RedeNeural.mutacao(novasRedesNeurais);

        redeNeural = novasRedesNeurais;

        for (let i = 0; i < qtdeIndividuosPorGeracao; i++) {
            bola[i] = new Bola(i);
        }
        console.log(`Melhores Scores:`);
        console.log(`1° - ${novasRedesNeurais[0].score} Pontos`);
        console.log(`2° - ${novasRedesNeurais[1].score} Pontos`);
        console.log(`3° - ${novasRedesNeurais[2].score} Pontos`);

        contadorGeracao++;
        console.log(`Estou na ${contadorGeracao}° Geração`);
    }

    /*if (train) {
        var bolaX = int(bola.x);
        var bolaY = int(bola.y);
        var raqueteX = raquete.x;

        let predicao = redeNeural.predict([bolaX / 1000, bolaY / 1000, raqueteX / 1000])
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
                        return element / 1000;
                    });
                let saida = dataset[index].output;
                redeNeural.train(entrada, saida);
            }
            contadorGeracao++;
            console.log(`Agora, na ${contadorGeracao}º geração, vou conseguir ;-)`);
            bola = new Bola();
        }
    }*/
}

/*function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        raquete.moveLeft();
        teclaEsquerda = 1;
    }
    if (keyCode == RIGHT_ARROW) {
        raquete.moveRight();
        teclaDireita = 1;
    }
}*/
