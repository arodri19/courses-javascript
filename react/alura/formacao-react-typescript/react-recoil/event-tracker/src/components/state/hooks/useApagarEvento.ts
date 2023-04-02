import { useSetRecoilState } from "recoil"
import { IEvento } from "../../../interfaces/IEvento"
import { listaDeEventosState } from "../atom"

const useApagarEvento = () => {
    const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState)
    return (evento: IEvento) => {
        return setListaDeEventos(listaAntiga => {
            return listaAntiga.filter(x=> x.id !== evento.id)
        })
    }
}

export default useApagarEvento