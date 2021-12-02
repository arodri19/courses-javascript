import { Cliente } from "./Cliente.js";
import { Gerente } from "./Funcionario/Gerente.js";
import { Diretor } from "./Funcionario/Diretor.js";
import { SistemaAutenticacao } from "./SistemaAutenticacao.js";

const diretor = new Diretor("Rodrigo", 10000,123456789);
diretor.senha = "1232457";
const gerente = new Gerente("Ricardo", 5000,123456789);
gerente.senha = "123";

const cliente = new Cliente("Teste", 1234578,"456");
const DiretorEstaLogado = SistemaAutenticacao.login(diretor,"1232457");
const GerenteEstaLogado = SistemaAutenticacao.login(gerente,"1232457");

console.log(estaLogado);