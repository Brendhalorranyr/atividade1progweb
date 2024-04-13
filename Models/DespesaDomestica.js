import { Despesa } from "./Despesa.js";

export default class DespesaDomestica extends Despesa {
    constructor(nome, descricao, valor, data, finalidade  ) {
        super(nome, descricao, valor, data);
        this.categoria = 'Doméstica';
        this.finalidade = finalidade;   
    }
}

