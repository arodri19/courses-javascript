import React from "react"
import style from './Time.module.scss'

interface Props {
    time: number | undefined
}

export default function Time({ time = 0}: Props)  {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const [minuteTen, minuteUnit] = String(minutes).padStart(2,'0');
    const [secondTen, secondUnit] = String(seconds).padStart(2, '0');
    return (
        <React.Fragment>
            <span className={style.timeNumber}>{minuteTen}</span>
            <span className={style.timeNumber}>{minuteUnit}</span>
            <span className={style.timeDivision}>:</span>
            <span className={style.timeNumber}>{secondTen}</span>
            <span className={style.timeNumber}>{secondUnit}</span>
        </React.Fragment>
    )
}