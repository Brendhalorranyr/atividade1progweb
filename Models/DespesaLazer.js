import { Despesa } from "./Despesa.js";

export default class DespesaLazer extends Despesa {
    constructor(nome, descricao, valor, data, local ) {
        super(nome ,descricao, valor, data);
        this.categoria = 'Lazer';
        this.local = local;
    }
}

