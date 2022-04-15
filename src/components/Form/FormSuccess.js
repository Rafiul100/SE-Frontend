import React from 'react'; 
import './Form.css';

//when user has successfully submitted the form with no errors, this function is called stating to the user the registration has been completed. 
const FormSucces = () => { 
return (
<div className="form-content-right">
    <h1 className="form-success">We have recieved your request!</h1> <br />
<img src="images/thumbs-up.png" alt="img-success" className='form-img-2' />
<h1 className="form-success link">Click <a href="/Sign-in">Here</a> to sign in </h1>


</div>
);

};

export default FormSucces; 