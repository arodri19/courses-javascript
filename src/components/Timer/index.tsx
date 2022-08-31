import Button from "../Button";
import Time from "./Time";
import style from './Timer.module.scss'

export default function Timer(){
    return (
        <div className={style.timer}>
            <p className={style.title}>Escolha um card e inicie o cronômetro</p>
            <div className={style.timeWrapper}>
                <Time />
            </div>
            <Button>
                Começar
            </Button>
        </div>
    )
}