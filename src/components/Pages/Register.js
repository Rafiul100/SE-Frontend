import React from 'react'; 
import './Register.css'; 
import '../../App.css'; 
import {Link} from 'react-router-dom';


function Register() {
    return (
        <>
        <div className='regcontainer'>
            <div className="box">
            <h1>What is your main goal?</h1> <br />
            <Link to = '/purchaseform'>  
                <button className='regbutton'> Purchase Essentials  </button> 
            </Link> <br />
            <Link to = '/sellform'>
                <button className='regbutton'> Sell Essentials </button> 
            </Link>
            </div>
        </div>
        </>
      
    )
}

export default Register
