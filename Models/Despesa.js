export class Despesa {
    constructor(nome ,descricao, valor, data) {
        this.nome = nome,
        this.valor = valor,
        this.data = data,
        this.descricao = descricao
        this.id = Date.now();
    }
}
