import { useRecoilValue } from "recoil";
import { erroState } from "../atom";

export const useMessagemDeErro = () => {
    const mensagem = useRecoilValue(erroState);
    return mensagem;
}