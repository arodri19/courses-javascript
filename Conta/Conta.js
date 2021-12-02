export class Conta{
    constructor(saldoInicial,cliente, agencia){
        if(this.construcor == Conta){
            throw new Error("você não deveria instanciar um objeto do tipo conta diretamente");
        }

        this.#saldo = saldoInicial;
        this.#cliente = cliente;
        this.#agencia = agencia;
    }

    set cliente(novoValor){
        if(novoValor instanceof Cliente){
            this.#cliente = novoValor;
        }
    }

    get cliente(){
        return this.#cliente;
    }

    get saldo(){
        return this.#saldo;
    }

    sacar(valor){
        throw new Error("Você não deveria chamar esse método");
    }

    #sacar(valor, taxa){
        const valorSacado = taxa * valor;
        if(this.#saldo >= valorSacado){
            this.#saldo -= valorSacado;
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