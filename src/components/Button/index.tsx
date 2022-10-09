import React from "react";
import style from './Button.module.scss'

interface Props {
    texto?: string, 
    children?: React.ReactNode, 
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: () => void
}

function Button({onClick, type, children}: Props){
    return (
        <button onClick={onClick} type={type} className={style.button}>
            {children}
        </button>
    )
}

export default Button;