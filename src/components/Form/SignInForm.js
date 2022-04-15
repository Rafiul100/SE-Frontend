import React, {useState}from 'react'
import './SignIn.css'

import {Button} from '../Button/Button'
import axios from 'axios'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'


const SellForm = () => {

const navigate = new useNavigate();  



const [siginInput, setSigninInput] = useState({
    email: '', 
    password: '',
    errorlist: [],
});


const handleinput = (e) => { 
    e.persist(); 
    setSigninInput({...siginInput, [e.target.name]: e.target.value});
}


const SigninSubmit = (e) => { 
    e.preventDefault(); 

    const data = { 
        email: siginInput.email,
        password: siginInput.password,
    }


 //login page should make a request to the endpoint shown below first to initialize CSRF protection for the application.
axios.get('/sanctum/csrf-cookie').then(response => {
    axios.post(`api/signin`, data).then(res => { 
        if(res.data.status === 200) {
             //users token, name and role is saved in the local storage when signing in
             localStorage.setItem('auth_id', res.data.id)
             localStorage.setItem('auth_token', res.data.token)
             localStorage.setItem('auth_name', res.data.name)
             localStorage.setItem('auth_role', res.data.role)
             //redirect user to thier correct page based on thier role after successfully sigining in
            if(res.data.role === 1) { 
                navigate('/admin');  
            } else if (res.data.role === 0) { 
                navigate('/student-buy'); 
            }
                else if (res.data.role === 2) { 
                    navigate('/student-sell')
                }

        }
        else if(res.data.status === 401) { 
            //warning message is sent when email and/or password is not recognisable 
            swal("Warning", res.data.message, "warning"); 
        }
        else {
            //errors are sent back from laravel if information is missing and/or not meeting constraints
            setSigninInput({...siginInput, errorlist: res.data.validation_errors})

        }

    });

});

}

    return (
        <>
        <div className='wrapper'>
           <div className="box">
         
            <form onSubmit={SigninSubmit} className="signin-form">
            <img src="images/open-book.png" alt="profile" />
            <div className="form-inputs signin-inputs">
                <label htmlFor="username" className="label"> Email: </label>
                <input 
                    id = 'email'
                    type="email" 
                    name = "email" 
                    className="signin-input"
                    placeholder='Enter your username'
                    onChange= {handleinput}
                    value={siginInput.email} 
                   />
                   <p>{siginInput.errorlist.email}</p> 
                
            </div>   <br />

            <div className="form-inputs">
                <label htmlFor="password" className="label"> Password: </label>
                <input 
                    id = 'password'
                    type="password" 
                    name = "password" 
                    className="signin-input"
                    placeholder='Enter your password'
                    onChange= {handleinput}
                    value={siginInput.password} /> 
                    <p>{siginInput.errorlist.password}</p>
            </div>  <br />

    <div className="signin-button">
        <Button  buttonStyle= 'btn-background-circle' buttonSize= 'btn--large'> Sign in  </Button>
    </div>

    </form>
           </div>
            
        </div>
        </>
    )
}

export default SellForm
