export class Cliente{

    get cpf(){
        return this.#cpf;
    }

    constructor(nome, cpf, senha){
        this.nome = nome;
        this.#cpf = cpf;
        this.#senha = senha;
    }

    // autenticar(senha){
    //     return this.#senha = senha;
    // }

    sacar(valor){
        if(this.#saldo >= valor){
            this.#saldo -= valor;
            return valor;
        }
    }

    depositar(valor){
        if(valor <= 0){
            return;
        }
        this.#saldo += valor;
    }

    transferir(valor, conta){
        const valorSacado = this.sacar(valor);
        conta.depositar(valorSacado);
    }
}