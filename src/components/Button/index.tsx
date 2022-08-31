import React from "react";
import style from './Button.module.scss'

class Button extends React.Component<{ texto?: string, children?: React.ReactNode }> {    
    render() {
        return (
            <button className={style.button}>
                {this.props.children}
            </button>
        )
    }
}

export default Button;