import React from 'react';
import '../../App.css';
import {Button} from '../Button/Button'; 
import './HeroSection.css'; 
import {Link} from 'react-router-dom';

function HeroSection() {
    return (
        <div className="hero-container">
            
            <h1 className='hero-header'>YOUR ESSENTIALS MATTER</h1>
            <p className='hero-subheader'>Buy and sell your essentials here</p>
            <div className="hero-btns">
    <Link to = '/register'> 
    <Button 
        id = 'change'
        className = 'btn'
        buttonStyle= 'btn--outline'
        buttonSize= 'btn--large'
    > 
        GET STARTED
    </Button>
    </Link>
    <Button 
        id = 'change'
        className = 'btn'
        buttonStyle= 'btn-border-underline'
        buttonSize= 'btn--large'
    > 
        WATCH TRAILER 
    </Button>
    </div>
        </div>
    )
}

export default HeroSection; 
