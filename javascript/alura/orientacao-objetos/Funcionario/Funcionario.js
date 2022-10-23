export class Funcionario {
    constructor(nome, salario, cpf) {
        if(this.constructor == Funcionario){
            throw new Error("Não pode ser instanciado por Funcionario")
        }

        this.#nome = nome;
        this.#salario = salario;
        this.#cpf = cpf;
        this.#bonificacao = 1
        this.#senha;
    }

    get senha(){
        return this.#senha;
    }

    autenticar(senha){
        return senha == this.#senha;
    }

    cadastrarSenha(senha){
        this.#senha = senha;
    }
}