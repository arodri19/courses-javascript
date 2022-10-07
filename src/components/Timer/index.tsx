import { useState } from "react";
import { timeToSeconds } from "../../common/utils/time";
import { ITask } from "../../types/tasks";
import Button from "../Button";
import Time from "./Time";
import style from './Timer.module.scss'

interface Props {
    selected: ITask | undefined
}

export default function Timer({ selected } : Props){
    const [time, setTime] = useState<number>();
    if(selected?.time) {
        setTime(timeToSeconds(selected?.time));
    }
    return (
        <div className={style.timer}>
            <p className={style.title}>Escolha um card e inicie o cronômetro</p>
            Tempo: {time}
            <div className={style.timeWrapper}>
                <Time />
            </div>
            <Button>
                Começar
            </Button>
        </div>
    )
}