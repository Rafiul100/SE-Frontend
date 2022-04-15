import React from 'react';
import './Button.css';


const STYLES = ['btn--primary', 'btn--secondary', 
               'btn--outline', 'btn-border-pop', 
               'btn-background-slide', 'btn-background-circle',
               'btn-border-underline', 'btn-background-circle-black']; 

const SIZE = ['btn--medium', 'btn--large', 'btn--xlarge', 'btn--small'];


export const Button = ({
id,
children, 
type, 
onClick, 
buttonStyle, 
buttonSize
}) => { 
    const checkButtonStyle = STYLES.includes(buttonStyle) 
    ? buttonStyle : STYLES[0];

    const checkButtonSize = SIZE.includes(buttonSize)
    ? buttonSize : SIZE[0];

    return (


<button
id={id}
className={`btn ${checkButtonStyle} ${checkButtonSize}`}
onClick={onClick}
type={type}
>
{children}
</button>

);

}



