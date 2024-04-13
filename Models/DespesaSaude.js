import { Despesa } from "./Despesa.js";

export default class DespesaSaude extends Despesa {
    constructor(nome ,descricao, valor, data, tipoHigiene) {
        super(nome ,descricao, valor, data);
        this.categoria = 'Saúde';
        this.tipoHigiene = tipoHigiene;
        
    }
}
