import React from 'react'
import {Link} from 'react-router-dom'; 
import './Boards.css'


function Boarditem(props) {
    return (
        <>
        <li className="boards__item">
            <Link to = {props.path} className="boards__item__link">
                <figure className="boards__item__pic-wrap" data-category = {props.label}>
                    <img src= {props.src} alt="student essentials" className="boards__item__img" />
                </figure>
                <div className="boards__item__info">
                    <h4 className="boards__item__text">{props.text}</h4> 
                </div>
            </Link>
        </li>
        </>
    ); 
}

export default Boarditem; 


