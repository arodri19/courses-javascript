import {Cliente} from './Cliente.js';
import {ContaCorrente} from './Conta/ContaCorrente.js';
import { ContaPoupanca } from './Conta/ContaPoupanca.js';


const cliente1 = new Cliente("Ricardo",122222222);


const contaCorrenteRicardo = new ContaCorrente(cliente1,1001);
contaCorrenteRicardo.depositar(100);
contaCorrenteRicardo.sacar(100);

const ContaPoupanca = new ContaPoupanca(50,cliente1, 1001);


console.log(ContaPoupanca);
console.log(ContaCorrente.numeroDeContas);