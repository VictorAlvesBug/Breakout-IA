function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x) {
    return x * (1 - x);
}

class RedeNeural {
    constructor(qtdeInput, qtdeHidden, qtdeOutput) {
        this.qtdeInput = qtdeInput;
        this.qtdeHidden = qtdeHidden;
        this.qtdeOutput = qtdeOutput;

        this.bias_ih = new Matrix(this.qtdeHidden, 1);
        this.bias_ih.randomize();

        this.bias_ho = new Matrix(this.qtdeOutput, 1);
        this.bias_ho.randomize();

        this.weights_ih = new Matrix(this.qtdeHidden, this.qtdeInput);
        this.weights_ih.randomize();

        this.weights_ho = new Matrix(this.qtdeOutput, this.qtdeHidden);
        this.weights_ho.randomize();

        this.learning_rate = 0.1;

        this.score = 0;
    }

    train(arrInput, arrTarget) {
        /// FEEDFORWARD
        let input = Matrix.arrayToMatrix(arrInput);

        //INPUT --> HIDDEN
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);
        hidden.map(sigmoid);

        //HIDDEN --> OUTPUT
        //d(Sigmoid) = Output * (1 - Output)
        let output = Matrix.multiply(this.weights_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);

        /// BACKPROPAGATION

        //OUTPUT --> HIDDEN
        let target = Matrix.arrayToMatrix(arrTarget);

        let output_error = Matrix.subtract(target, output);
        let d_output = Matrix.map(output, dsigmoid);
        let hidden_T = Matrix.transpose(hidden);

        let gradient = Matrix.hadamard(d_output, output_error);
        gradient = Matrix.escalar_multiply(gradient, this.learning_rate);

        this.bias_ho = Matrix.add(this.bias_ho, gradient);

        let weights_ho_deltas = Matrix.multiply(gradient, hidden_T);
        this.weights_ho = Matrix.add(this.weights_ho, weights_ho_deltas);

        //HIDDEN --> INPUT
        let weights_ho_T = Matrix.transpose(this.weights_ho);
        let hidden_error = Matrix.multiply(weights_ho_T, output_error);
        let d_hidden = Matrix.map(hidden, dsigmoid);
        let input_T = Matrix.transpose(input);

        let gradient_H = Matrix.hadamard(d_hidden, hidden_error);
        gradient_H = Matrix.escalar_multiply(gradient_H, this.learning_rate);

        this.bias_ih = Matrix.add(this.bias_ih, gradient_H);

        let weight_ih_deltas = Matrix.multiply(gradient_H, input_T);
        this.weights_ih = Matrix.add(this.weights_ih, weight_ih_deltas);
    }

    predict(arr) {
        /// FEEDFORWARD
        let input = Matrix.arrayToMatrix(arr);

        //INPUT --> HIDDEN
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);
        hidden.map(sigmoid);

        //HIDDEN --> OUTPUT
        let output = Matrix.multiply(this.weights_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);

        return Matrix.MatrixToArray(output);
    }

    static selecaoNatural(arrayRedesNeurais, quantasDasMelhores) {
        arrayRedesNeurais.sort(function (a, b) { return b.score - a.score });
        return arrayRedesNeurais.splice(0, quantasDasMelhores);
    }

    static replicarMelhoresRedes(arrayRedesNeurais, qtdeDeRedesParaGerar) {
        let qtdeRedesIniciais = arrayRedesNeurais.length;
        while (arrayRedesNeurais.length < qtdeDeRedesParaGerar) {
            let indiceRedeBase = floor(random() * qtdeRedesIniciais);
            arrayRedesNeurais.push(arrayRedesNeurais[indiceRedeBase]);
        }

        return arrayRedesNeurais;
    }

    static crossOver(arrayRedesNeurais, qtdeRedesBase) {
        for (let i = qtdeRedesBase; i < arrayRedesNeurais.length; i++) {
            let indiceRedeBaseA, indiceRedeBaseB, novasMatrizes;

            indiceRedeBaseA = i;
            indiceRedeBaseB = i + 1 + floor(random() * arrayRedesNeurais.length - (i + 1));
            novasMatrizes = Matrix.crossOver(arrayRedesNeurais[indiceRedeBaseA].weights_ih, arrayRedesNeurais[indiceRedeBaseB].weights_ih);
            arrayRedesNeurais[indiceRedeBaseA].weights_ih = novasMatrizes[0];
            arrayRedesNeurais[indiceRedeBaseB].weights_ih = novasMatrizes[1];

            indiceRedeBaseA = i;
            indiceRedeBaseB = i + 1 + floor(random() * arrayRedesNeurais.length - (i + 1));
            novasMatrizes = Matrix.crossOver(arrayRedesNeurais[indiceRedeBaseA].weights_ho, arrayRedesNeurais[indiceRedeBaseB].weights_ho);
            arrayRedesNeurais[indiceRedeBaseA].weights_ho = novasMatrizes[0];
            arrayRedesNeurais[indiceRedeBaseB].weights_ho = novasMatrizes[1];

            indiceRedeBaseA = i;
            indiceRedeBaseB = i + 1 + floor(random() * arrayRedesNeurais.length - (i + 1));
            novasMatrizes = Matrix.crossOver(arrayRedesNeurais[indiceRedeBaseA].bias_ih, arrayRedesNeurais[indiceRedeBaseB].bias_ih);
            arrayRedesNeurais[indiceRedeBaseA].bias_ih = novasMatrizes[0];
            arrayRedesNeurais[indiceRedeBaseB].bias_ih = novasMatrizes[1];

            indiceRedeBaseA = i;
            indiceRedeBaseB = i + 1 + floor(random() * arrayRedesNeurais.length - (i + 1));
            novasMatrizes = Matrix.crossOver(arrayRedesNeurais[indiceRedeBaseA].bias_ho, arrayRedesNeurais[indiceRedeBaseB].bias_ho);
            arrayRedesNeurais[indiceRedeBaseA].bias_ho = novasMatrizes[0];
            arrayRedesNeurais[indiceRedeBaseB].bias_ho = novasMatrizes[1];
        }
        
        return arrayRedesNeurais;
    }

    static mutacao(arrayRedesNeurais) {
        let qtdeRedesIniciais = arrayRedesNeurais.length;
        while (arrayRedesNeurais.length < qtdeDeRedesParaGerar) {
            let qtdeInput = arrayRedesNeurais[0].qtdeInput;
            let qtdeHidden = arrayRedesNeurais[0].qtdeHidden;
            let qtdeOutput = arrayRedesNeurais[0].qtdeOutput;
            let novaRedeNeural = new RedeNeural(qtdeInput, qtdeHidden, qtdeOutput);
            let indiceRedeBase = floor(random() * qtdeRedesIniciais);
            novaRedeNeural.bias_ih = arrayRedesNeurais[indiceRedeBase].bias_ih.mutacao();
            novaRedeNeural.bias_ho = arrayRedesNeurais[indiceRedeBase].bias_ho.mutacao();
            novaRedeNeural.weights_ih = arrayRedesNeurais[indiceRedeBase].weights_ih.mutacao();
            novaRedeNeural.weights_ho = arrayRedesNeurais[indiceRedeBase].weights_ho.mutacao();
            arrayRedesNeurais.push(novaRedeNeural);
        }

        return arrayRedesNeurais;
    }
}