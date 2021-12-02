// import { Funcionario } from "./Funcionario/Funcionario";

export class SistemaAutenticacao{
    static login(autenticavel, senha){
        if(SistemaAutenticacao.ehAutenticavel(autenticavel)){
            return autenticavel.autenticar(senha);
        }
        return false;
    }

    static ehAutenticavel(autenticavel){
        return "autenticar" in autenticavel && autenticavel.autenticar instanceof Function


        // if(autenticavel instanceof Funcionario){
        //     return true;
        // }

        // return false;
    }
}