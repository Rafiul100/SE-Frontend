import React from 'react';
import './Form.css';
import useForm from './useForm';
import validateinfo from './validateInfo';



//deconstruct the submitform function so it can be used by the useform function
const FormSignup = ({submitForm}) => {
const {handleChange, values, handleSubmit, errors}  
= useForm(submitForm, validateinfo); 
 //submitForm runs only after the laravel checks user input against data constraints placed by validator.  


    return (
  
     <div className="form-content-right">
         <form  className="form" onSubmit={handleSubmit}>

            <div className="form-inputs">
                <label htmlFor="username" className="form-label"> Username: </label>
                <input 
                    id = 'username'
                    type="text" 
                    name = "name" 
                    className="form-input"
                    placeholder='Enter your username'
                    //users inputs are gathered here
                    value = {values.name}
                    //whenever there is a change in input field call upon handlechange function
                    onChange= {handleChange} />
                    {//checks if an error has been made in the username, if true display an error message for the following error.
                    errors.name && <p>{errors.name}</p>}
                    </div>  

                <div className="form-inputs form-radio">
                    <label htmlFor="gender" className="form-label gender"> Gender: </label>  
                <label className="form-label radio"> 
                    Male:
                    <input 
                    type="radio" 
                    name = "gender" 
                    value = "male"
                    onChange= {handleChange} />
                 </label>
                 <label className="form-label radio"> 
                    Female:
                    <input 
                    type="radio" 
                    name = "gender"
                    value = "female"
                    onChange= {handleChange} />
                 </label>
                 {errors.gender && <p className='radioerror'>{errors.gender}</p>}
                </div> 

            <div className="form-inputs">
                <label htmlFor="email" className="form-label"> Email: </label>
                <input 
                    id = 'email'
                    type="email" 
                    name = "email" 
                    className="form-input"
                    placeholder='Enter your Email'
                    value = {values.email}
                    onChange= {handleChange} />
                     <p>{values.email_error.email}</p>
            </div> 
            <div className="form-inputs">
                <label htmlFor="university" className="form-label"> Univeristy: </label>
                <input 
                    id = "university"
                    type="text" 
                    name = "university" 
                    className="form-input"
                    placeholder='Enter your Univeristy (optional)'
                    value = {values.university}
                    onChange= {handleChange} />
            </div> 
            {/* <div className="form-inputs">
                <label htmlFor="address" className="form-label"> Address: </label>
                <input 
                    id = "address"
                    type="text" 
                    name = "address" 
                    className="form-input"
                    placeholder='Enter your Address (optional)'
                    value = {values.address}
                    onChange= {handleChange} />
            </div>   */}

               
                <div className="form-inputs">
                <label htmlFor="password" className="form-label"> Password: </label>
                <input 
                    id = 'password'
                    type="password" 
                    name = "password" 
                    className="form-input"
                    placeholder='Enter your password'
                    value = {values.password}
                    onChange= {handleChange} />
                    {errors.password && <p>{errors.password}</p>}
            </div> 
                   
            <div className="form-inputs">
                <label htmlFor="password2" className="form-label">Confirm Password: </label>
                <input
                    id = 'password2'
                    type="password" 
                    name = "password2" 
                    className="form-input"
                    placeholder='Enter your password'
                    value = {values.password2}
                    onChange= {handleChange} />
                     {errors.password2 && <p>{errors.password2}</p>}
            </div> 
            <button className="form-input-btn" type = 'submit'>
                   Sign Up
            </button>
            <span className='form-input-login'>
                Already have an account? Sign In   <a href="/Sign-in">Here</a>
            </span>
         </form>
     </div>
    )
}

export default FormSignup
