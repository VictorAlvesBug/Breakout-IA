class Raquete {
    constructor(indice) {
        this.indice = indice;

        this.x = width / 2;
        this.y = height * 0.8;
        this.width = 150;
        this.height = 10;
        this.increment = 50;

        this.setEdges();
    }

    moveLeft() {
        //console.warn('CLICANDO PRA ESQUERDA');
        if (this.x - this.increment > this.width / 2) {
            this.x -= this.increment;
        }
        else {
            this.x = this.width / 2;
        }
        this.setEdges();
    }
    moveRight() {
        //console.warn('CLICANDO PRA DIREITA');
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
        colorMode(HSB);
        fill(map(this.indice, 0, qtdeIndividuosPorGeracao, 0, 360), 255, 255);
        colorMode(RGB);
        rect(this.left, this.top, this.width, this.height);
    }
}