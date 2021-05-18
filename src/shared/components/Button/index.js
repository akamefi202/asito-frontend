import React from 'react'
import "./style.scss";

const STYLE = ['btn--primary','btn--second','btn--green', 'btn--danger','btn--outline', 'btn--disabled']

const SIZES = ['btn--small','btn--medium', 'btn--large']


const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    customDisabledClass,
    buttonSize,
    disabled = false,
    custom = '',
    icon,
    ...rest
}) => {

    const checkButtonStyle = STYLE.includes(buttonStyle) ? buttonStyle : STYLE[0]

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[1]

    return (
            <button
                className={`btn ${checkButtonSize} ${custom} `+ ( disabled ? ' btn--disabled ' + customDisabledClass: checkButtonStyle ) }
                onClick={onClick}
                type={type}
                disabled={disabled}
                {...rest}
            >
                {icon}
                {children}
            </button>
    )
}
export default Button
