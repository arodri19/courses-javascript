import React from "react"
import style from './Time.module.scss'

export default function Time() {
    return (
        <React.Fragment>
            <span className={style.timeNumber}>0</span>
            <span className={style.timeNumber}>0</span>
            <span className={style.timeDivision}>:</span>
            <span className={style.timeNumber}>0</span>
            <span className={style.timeNumber}>0</span>
        </React.Fragment>
    )
}