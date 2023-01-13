import { useEffect, useState } from "react";
import { timeToSeconds } from "../../common/utils/time";
import { ITask } from "../../types/tasks";
import Button from "../Button";
import Time from "./Time";
import style from './Timer.module.scss'

interface Props {
    selected: ITask | undefined,
    taskFinish: () => void
}

export default function Timer({ selected, taskFinish } : Props){
    const [time, setTime] = useState<number>();
    useEffect(() => {
        if(selected?.time){
            setTime(timeToSeconds(selected.time));
        }
    }, [selected]);
    function regressive(counter: number = 0){
        setTimeout(() => {
            if(counter > 0){
                setTime(counter -1);
                return regressive(counter -1);
            }
            taskFinish();
        }, 1000);
    }

    return (
        <div className={style.timer}>
            <p className={style.title}>Escolha um card e inicie o cronômetro</p>
            <div className={style.timeWrapper}>
                <Time time={time}/>
            </div>
            <Button onClick={() => regressive(time)}>
                Começar
            </Button>
        </div>
    )
}