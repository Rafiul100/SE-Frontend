import React, { useState } from 'react';
import './Form.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);


//submitform function is called as a callback in the useform component. 
//its called as a callback to check if there are any errors made before proceeding with the submission. 
//once its called it sets the isSubmitted to true. 
  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
    <div className="contianer">
      <div className='form-container'>
        <span className='close-btn'>×</span>
        <div className='form-content-left'>
          <img className='form-img' src='/images/register.jpg' alt='stationary' />
        </div>
        {//this checks if the form has been submitted or not. if it has not then carry on displaying the formSignup page
        //if it has been submitted show the formSuccess page instead.
        //sending submitform as a prop to formsignup for deconstruction. 
        !isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </div>
      </div>
    </>
  );
};

export default Form;
