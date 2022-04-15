import React from 'react'
import {Link} from 'react-router-dom'; 
import { Button } from '../Button/Button';
import './Footer.css'; 

function Footer() {
    return (
        <div className='footer__container'>
            <div className="flex">
            <div className="footer__links">
            <div className="footer__wrapper header">
                <h2 class = 'logo'>Student-Essentials <i className="fas fa-graduation-cap"/></h2>
                <p className='footer__wrapper__para'>A platform for all university students across the UK to buy and sell thier essentials</p>
            </div>
            <div className="footer__wrapper links">
                <h2>Support</h2>
               <Link className='footer__link' to= 'sign-up'>Contact Us</Link> <br />
               <Link className='footer__link' to= 'sign-up'>FAQ</Link>
            </div>
            </div>
            <div className="signup">
                <h2>Register for free</h2>
              <Link to = '/register'> 
              <Button className = 'btn'
                        buttonStyle= 'btn--outline'
                         buttonSize= 'btn--large'>
                             Sign Up
                </Button>  
              </Link>  
            </div>
            </div>
            <div className="socials">
            <div className="button">
            <div className="icon">
                <i className = "fab fa-facebook-f"></i>
            </div>
            <span>Facebook</span>
        </div>

        <div className="button">
            <div className="icon">
                <i className = "fab fa-youtube"></i>
            </div>
            <span>Youtube</span>
        </div>

        <div className="button">
            <div className="icon">
                <i className = "fab fa-twitter"></i>
            </div>
            <span>Twitter</span>
        </div>

        <div className="button">
            <div className ="icon">
                <i className = "fab fa-instagram"></i>
            </div>
            <span>Instagram</span>
        </div>

        <div class="button">
            <div className ="icon">
                <i className = "fab fa-github"></i>
            </div>
            <span>Github</span>
        </div>
            </div>
            <div className="copyright">
                @2021 Copyright: Student-Essentials
            </div>
        </div>

    )
}

export default Footer
