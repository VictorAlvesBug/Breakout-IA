class Bola {
    constructor(indice) {
        this.indice = indice;

        this.x = larguraPlayground / 2;
        this.y = 20;
        this.width = 10;
        this.height = 10;
        this.speed = 5;
        if (random() > 0.5) {
            this.moveAngle = map(random(), 0, 1, 0.5, PI / 2 - 0.5);
        }
        else {
            this.moveAngle = map(random(), 0, 1, PI / 2 + 0.5, PI - 0.5);
        }
        this.vidas = 3;
        this.score = 0;
        this.maxScore = 0;
        this.visibility = true;
        this.setEdges();
    }

    hide() {
        this.visibility = false;
    }

    show() {
        this.visibility = true;
    }

    update() {
        if (this.vidas > 0) {
            this.x += this.speed * cos(this.moveAngle);
            this.y += this.speed * sin(this.moveAngle);

            this.setEdges();

            //COLISÃO COM PAREDES LATERAIS
            if (this.left <= 0 || this.right >= larguraPlayground) {
                this.moveAngle = ((this.moveAngle - PI / 2) * (-1)) + PI / 2;
            }

            //COLISÃO COM PAREDE SUPERIOR
            if (this.top <= 0) {
                this.moveAngle = this.moveAngle * (-1);
            }

            //COLISÃO COM RAQUETE
            if (this.bottom >= raquete[this.indice].top && this.top <= raquete[this.indice].top &&
                this.right >= raquete[this.indice].left && this.left <= raquete[this.indice].right) {
                this.moveAngle = this.moveAngle * (-1);
                this.moveAngle += random() * 0.2 - 0.1;
                this.score++;
                if (this.score > this.maxScore) {
                    this.maxScore = this.score;
                }
                this.y = raquete[this.indice].top - this.height;
                this.speed += 0.2;
            }

            //SAÍDA PELA PARTE INFERIOR DA TELA
            if (this.top >= alturaPlayground) {
                this.vidas--;

                this.x = larguraPlayground / 2;
                this.y = 20;
                if (random() > 0.5) {
                    this.moveAngle = map(random(), 0, 1, 0.5, PI / 2 - 0.5);
                }
                else {
                    this.moveAngle = map(random(), 0, 1, PI / 2 + 0.5, PI - 0.5);
                }
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
        if (this.visibility && this.vidas > 0) {
        noStroke();
        colorMode(HSB);
        fill(map(this.indice, 0, qtdeIndividuosPorGeracao, 0, 360), 255, 255);
        colorMode(RGB);
        ellipse(this.x, this.y, this.width, this.height);

        //text(`VIDAS: ${this.vidas}`, this.x-20, this.y+20);
        //text(`SCORE: ${this.score}`, this.x-22, this.y + 35);
        }
    }

    info(indiceParaMostrar) {
        let legendaX = larguraPlayground + 10;
        let legendaY = 10 + 15 * indiceParaMostrar;
        let legendaWidth = 180;
        let legendaHeight = 15;

        noStroke();
        colorMode(HSB);
        fill(map(this.indice, 0, qtdeIndividuosPorGeracao, 0, 360), 255, 255);
        colorMode(RGB);

        stroke(0);
        rect(legendaX, legendaY, legendaWidth, legendaHeight);

        noStroke();
        fill(0);

        text(`VIDAS: ${this.vidas}`, legendaX + 20, legendaY + 12);
        text(`SCORE: ${this.score}`, legendaX + 100, legendaY + 12);

        if (mouseX >= legendaX && mouseX <= legendaX + legendaWidth &&
            mouseY >= legendaY && mouseY <= legendaY + legendaHeight) {
            for (let i = 0; i < qtdeIndividuosPorGeracao; i++) {
                bola[i].hide();
                raquete[i].hide();
            }
            
            this.show();
            raquete[this.indice].show();
        }
    }
}